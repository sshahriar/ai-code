import '@testing-library/jest-dom';

// Global EventSource mock if needed in jsdom
if (typeof window !== 'undefined' && !window.EventSource) {
  class MockEventSource {
    url: string;
    onopen: (() => void) | null = null;
    onmessage: ((event: any) => void) | null = null;
    onerror: ((event: any) => void) | null = null;

    constructor(url: string) {
      this.url = url;
    }

    close() {}
  }
  (window as any).EventSource = MockEventSource;
}
