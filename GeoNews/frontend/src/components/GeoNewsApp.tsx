"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addWatchlist,
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
import { PlaceSearch } from "./PlaceSearch";
import { Watchlist } from "./Watchlist";

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
  const [streamTick, setStreamTick] = useState(0);

  const usingFixtures = apiMode === "fixture";

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

  const onPlaceSelect = (place: PlaceResult) => {
    setFocus({ lat: place.lat, lon: place.lon, name: place.name.split(",")[0] ?? place.name });
    setFlyTarget({
      lat: place.lat,
      lon: place.lon,
      zoom: 12,
      bbox: place.bbox,
    });
  };

  const onWatchFly = (place: WatchPlace) => {
    setFocus({ lat: place.lat, lon: place.lon, name: place.name });
    setFlyTarget({ lat: place.lat, lon: place.lon, zoom: 12 });
  };

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
    setChatLoading(true);
    try {
      const { data, mode } = await getBrief({
        lat: focus.lat,
        lon: focus.lon,
        window: timeWindow,
      });
      mergeMode(mode);
      setBrief(data);
    } finally {
      setChatLoading(false);
    }
  };

  const onSend = async (message: string) => {
    setMessages((m) => [...m, { role: "user", text: message }]);
    setChatLoading(true);
    try {
      const { data, mode } = await postChat({
        message,
        lat: focus.lat,
        lon: focus.lon,
        place_name: focus.name,
      });
      mergeMode(mode);
      setMessages((m) => [...m, { role: "assistant", text: data.message }]);
      if (data.brief) setBrief(data.brief);
      if (data.watchlist_changes?.length) {
        await refreshWatchlist();
      }
      return data;
    } finally {
      setChatLoading(false);
    }
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
        </div>

        <div className="flex h-[42vh] w-full shrink-0 flex-col lg:h-auto lg:w-[360px] xl:w-[400px]">
          <div className="min-h-0 flex-1">
            <EventDrawer
              events={events}
              selected={selected}
              onSelect={setSelected}
              onClose={() => setSelected(null)}
              emptyHint={emptyHint}
              usingFixtures={usingFixtures}
            />
          </div>
          <AiPanel
            brief={brief}
            messages={messages}
            loading={chatLoading}
            usingFixtures={usingFixtures}
            onSend={onSend}
            onLoadBrief={onLoadBrief}
          />
        </div>
      </div>
    </div>
  );
}
