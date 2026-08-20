"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  addWatchlist,
  describeApiError,
  getBrief,
  getEvents,
  getHealth,
  getHeatmap,
  getHotspots,
  getWatchlist,
  postChat,
  removeWatchlist,
  subscribeEventStream,
  type ApiMode,
} from "@/lib/api";
import { usePlaceIngest } from "@/lib/usePlaceIngest";
import { DHAKA } from "@/lib/fixtures";
import type {
  BriefPayload,
  EventCategory,
  GeoEvent,
  HealthStatus,
  HeatPoint,
  Hotspot,
  MapBBox,
  MapFlyTarget,
  PlaceResult,
  TimeWindow,
  WatchPlace,
} from "@/lib/types";
import { AiPanel } from "./AiPanel";
import { EventDrawer } from "./EventDrawer";
import { FilterChips } from "./FilterChips";
import { Header } from "./Header";
import { HotspotList } from "./HotspotList";
import { MapCanvas } from "./MapCanvas";
import { PlaceIngestStatus } from "./PlaceIngestStatus";
import { PlaceSearch } from "./PlaceSearch";
import { Watchlist } from "./Watchlist";

type ChatAction = { type: "chat"; message: string } | { type: "brief" };

export function GeoNewsApp() {
  const [category, setCategory] = useState<EventCategory | null>(null);
  const [timeWindow, setTimeWindow] = useState<TimeWindow>("72h");
  const [heatmap, setHeatmap] = useState(false);
  const [bbox, setBbox] = useState<MapBBox | null>(null);
  const [events, setEvents] = useState<GeoEvent[]>([]);
  const [selected, setSelected] = useState<GeoEvent | null>(null);
  const [watchlist, setWatchlist] = useState<WatchPlace[]>([]);
  const [heatPoints, setHeatPoints] = useState<HeatPoint[]>([]);
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [apiMode, setApiMode] = useState<ApiMode>("live");
  const [flyTarget, setFlyTarget] = useState<MapFlyTarget | null>({
    lat: DHAKA.lat,
    lon: DHAKA.lon,
    zoom: DHAKA.zoom,
  });
  const [focus, setFocus] = useState({
    lat: DHAKA.lat,
    lon: DHAKA.lon,
    name: "Dhaka",
  });
  const [brief, setBrief] = useState<BriefPayload | null>(null);
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; text: string }>
  >([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [llmMockResponse, setLlmMockResponse] = useState<boolean | null>(null);
  const [streamTick, setStreamTick] = useState(0);
  const lastChatAction = useRef<ChatAction | null>(null);

  const usingFixtures = apiMode === "fixture";

  /** A live `mock: true` answer wins over health, which may itself be a fixture. */
  const llmMock =
    llmMockResponse ?? (!usingFixtures && health?.sources?.llm === "mock");

  const bumpReload = useCallback(() => setStreamTick((n) => n + 1), []);

  const mergeMode = useCallback((mode: ApiMode) => {
    setApiMode((prev) => (mode === "fixture" || prev === "fixture" ? mode : "live"));
  }, []);

  const refreshWatchlist = useCallback(async () => {
    const { data, mode } = await getWatchlist();
    mergeMode(mode);
    setWatchlist(data);
  }, [mergeMode]);

  useEffect(() => {
    void (async () => {
      const { data, mode } = await getHealth();
      mergeMode(mode);
      setHealth(data);
    })();
    void refreshWatchlist();
  }, [mergeMode, refreshWatchlist]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { data, mode } = await getEvents({
        bbox,
        category,
        window: timeWindow,
      });
      if (cancelled) return;
      mergeMode(mode);
      setEvents(data);
      setSelected((prev) =>
        prev && data.some((e) => e.id === prev.id)
          ? data.find((e) => e.id === prev.id) ?? null
          : prev && !data.some((e) => e.id === prev.id)
            ? null
            : prev,
      );
    })();
    return () => {
      cancelled = true;
    };
  }, [bbox, category, timeWindow, streamTick, mergeMode]);

  useEffect(() => {
    if (!heatmap) {
      setHeatPoints([]);
      return;
    }
    let cancelled = false;
    void (async () => {
      const { data, mode } = await getHeatmap({ bbox });
      if (cancelled) return;
      mergeMode(mode);
      setHeatPoints(data);
    })();
    return () => {
      cancelled = true;
    };
  }, [heatmap, bbox, streamTick, mergeMode]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { data, mode } = await getHotspots({
        window: timeWindow,
        place: focus.name,
      });
      if (cancelled) return;
      mergeMode(mode);
      setHotspots(data);
    })();
    return () => {
      cancelled = true;
    };
  }, [timeWindow, focus.name, streamTick, mergeMode]);

  useEffect(() => {
    return subscribeEventStream(() => {
      setStreamTick((n) => n + 1);
    });
  }, []);

  const placeIngest = usePlaceIngest({
    onEvents: setEvents,
    onReload: bumpReload,
  });
  const startPlaceIngest = placeIngest.start;

  const onPlaceSelect = useCallback(
    (place: PlaceResult) => {
      const name = place.name.split(",")[0]?.trim() || place.name;
      setFocus({ lat: place.lat, lon: place.lon, name });
      setFlyTarget({
        lat: place.lat,
        lon: place.lon,
        zoom: 12,
        bbox: place.bbox,
      });
      void startPlaceIngest({
        name,
        lat: place.lat,
        lon: place.lon,
        country_code: place.country_code,
      });
    },
    [startPlaceIngest],
  );

  const onWatchFly = useCallback(
    (place: WatchPlace) => {
      setFocus({ lat: place.lat, lon: place.lon, name: place.name });
      setFlyTarget({ lat: place.lat, lon: place.lon, zoom: 12 });
      void startPlaceIngest({ name: place.name, lat: place.lat, lon: place.lon });
    },
    [startPlaceIngest],
  );

  const onAddCurrent = async () => {
    const { mode } = await addWatchlist({
      name: focus.name,
      lat: focus.lat,
      lon: focus.lon,
      radius_km: 25,
    });
    mergeMode(mode);
    await refreshWatchlist();
  };

  const onRemove = async (id: string) => {
    const { mode } = await removeWatchlist(id);
    mergeMode(mode);
    await refreshWatchlist();
  };

  const onLoadBrief = async () => {
    lastChatAction.current = { type: "brief" };
    setChatLoading(true);
    setChatError(null);
    try {
      const data = await getBrief({
        lat: focus.lat,
        lon: focus.lon,
        window: timeWindow,
        place_name: focus.name,
      });
      setLlmMockResponse(data.mock === true);
      setBrief(data);
    } catch (err) {
      setChatError(describeApiError(err, "Could not load the AI brief."));
    } finally {
      setChatLoading(false);
    }
  };

  const runChat = async (message: string, echoUser: boolean) => {
    lastChatAction.current = { type: "chat", message };
    if (echoUser) setMessages((m) => [...m, { role: "user", text: message }]);
    setChatLoading(true);
    setChatError(null);
    try {
      const data = await postChat({
        message,
        lat: focus.lat,
        lon: focus.lon,
        place_name: focus.name,
        window: timeWindow,
      });
      setLlmMockResponse(data.mock === true);
      setMessages((m) => [...m, { role: "assistant", text: data.message }]);
      if (data.brief) setBrief(data.brief);
      if (data.watchlist_changes?.length) {
        await refreshWatchlist();
      }
      return data;
    } catch (err) {
      setChatError(describeApiError(err, "The AI analyst request failed."));
    } finally {
      setChatLoading(false);
    }
  };

  const onSend = (message: string) => runChat(message, true);

  const onChatRetry = () => {
    const action = lastChatAction.current;
    if (!action) return;
    if (action.type === "brief") void onLoadBrief();
    else void runChat(action.message, false);
  };

  const emptyHint = useMemo(() => {
    if (usingFixtures) {
      return "Backend unreachable — showing sample wire fixtures. Sample badges are demos, not police reports.";
    }
    return undefined;
  }, [usingFixtures]);

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-[var(--bg)] text-[var(--text)]">
      <Header health={health} apiMode={apiMode} />

      <div className="z-10 flex flex-col gap-2 border-b border-[var(--border)] bg-[var(--bg)]/70 px-3 py-2 backdrop-blur-md sm:px-4">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <PlaceSearch onSelect={onPlaceSelect} />
          <FilterChips
            category={category}
            window={timeWindow}
            heatmap={heatmap}
            onCategory={setCategory}
            onWindow={setTimeWindow}
            onHeatmap={setHeatmap}
          />
        </div>
        <PlaceIngestStatus state={placeIngest.state} onRetry={placeIngest.retry} />
        <Watchlist
          places={watchlist}
          onFly={onWatchFly}
          onRemove={onRemove}
          onAddCurrent={onAddCurrent}
        />
        <HotspotList
          hotspots={hotspots}
          onSelect={(h) => {
            setFocus({ lat: h.lat, lon: h.lon, name: h.name });
            setFlyTarget({ lat: h.lat, lon: h.lon, zoom: 13 });
          }}
        />
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col lg:flex-row">
        <div className="relative min-h-[45vh] flex-1 lg:min-h-0">
          <MapCanvas
            events={events}
            heatPoints={heatPoints}
            heatmap={heatmap}
            selectedId={selected?.id ?? null}
            flyTarget={flyTarget}
            onBoundsChange={setBbox}
            onSelectEvent={setSelected}
          />
          <AiPanel
            brief={brief}
            messages={messages}
            loading={chatLoading}
            mockMode={llmMock}
            error={chatError}
            placeName={focus.name}
            onSend={onSend}
            onLoadBrief={onLoadBrief}
            onRetry={onChatRetry}
          />
        </div>

        <div className="flex h-[42vh] w-full shrink-0 flex-col lg:h-auto lg:w-[360px] xl:w-[400px]">
          <EventDrawer
            events={events}
            selected={selected}
            onSelect={setSelected}
            onClose={() => setSelected(null)}
            emptyHint={emptyHint}
            usingFixtures={usingFixtures}
          />
        </div>
      </div>
    </div>
  );
}
