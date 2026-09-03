/* Elvara / Coastline Modern: editorial wayfinding, sunlit tactility, useful warmth. */
import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  Compass,
  LocateFixed,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  Search,
  Send,
  Sparkles,
  Sun,
  X,
} from "lucide-react";

const destinations = [
  { id: "jaipur", city: "Jaipur", country: "Rajasthan, India", tag: "Rose + rhythm", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=85", temp: "29°", weather: "Dry + golden", meta: "Best for 3–5 days", blurb: "Pink courtyards, morning markets, and a desert horizon just beyond the city.", places: [{ name: "Amber Fort", type: "History", note: "Arrive before the heat and watch the Aravalli hills turn gold." }, { name: "Johari Bazaar", type: "Market", note: "Follow the sound of the city through a ribbon of craft and colour." }, { name: "Patrika Gate", type: "Architecture", note: "A vivid pause for painted arches and a slower evening walk." }] },
  { id: "varanasi", city: "Varanasi", country: "Uttar Pradesh, India", tag: "River rituals", image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=900&q=85", temp: "31°", weather: "Hazy + warm", meta: "Best for 2–4 days", blurb: "A river city best understood in layers: dawn, bells, boats, and long walks.", places: [{ name: "Assi Ghat at dawn", type: "Ritual + river", note: "Take the first boat out and let the river set the pace." }, { name: "Old city lanes", type: "Neighbourhood", note: "Wander without a checklist; the small details are the point." }, { name: "Ganga Aarti", type: "Evening", note: "Find a respectful place to watch the lamps gather on the river." }] },
  { id: "kerala", city: "Kerala", country: "India", tag: "Backwater slow", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85", temp: "27°", weather: "Humid + green", meta: "Best for 5–8 days", blurb: "A lush south-west rhythm of palms, backwaters, spice, and unhurried mornings.", places: [{ name: "Alleppey backwaters", type: "Waterway", note: "Trade the packed schedule for a quiet stretch of water and sky." }, { name: "Fort Kochi", type: "Art + history", note: "Mix old harbour streets with galleries, cafés, and evening light." }, { name: "Munnar tea country", type: "Highlands", note: "Rise into the hills for cooler air and long green views." }] },
  { id: "ladakh", city: "Ladakh", country: "Himalayas, India", tag: "High silence", image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=900&q=85", temp: "12°", weather: "Clear + crisp", meta: "Best for 6–9 days", blurb: "High-altitude roads, monasteries, and an enormous sky that asks you to slow down.", places: [{ name: "Thiksey Monastery", type: "Culture", note: "Go early for quiet rooms, mountain light, and a sense of scale." }, { name: "Pangong Lake", type: "Landscape", note: "Build in time for the road; the journey is part of the place." }, { name: "Leh market", type: "Local life", note: "A gentle first-day wander while your body finds the altitude." }] },
  { id: "goa", city: "Goa", country: "India", tag: "Coastal eavase", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85", temp: "28°", weather: "Sea breeze", meta: "Best for 4–6 days", blurb: "A softer coast of later lunches, old houses, and evenings that stretch out.", places: [{ name: "Fontainhas", type: "Old quarter", note: "Walk the colourful lanes before the day gets loud." }, { name: "Agonda beach", type: "Coast", note: "Choose a quiet edge of sand and let the afternoon disappear." }, { name: "Anjuna market", type: "Market", note: "Come for the textures, stay for a sunset by the water." }] },
  { id: "meghalaya", city: "Meghalaya", country: "North-East India", tag: "Rain forest", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85", temp: "21°", weather: "Misty + cool", meta: "Best for 5–7 days", blurb: "Living root bridges, cloud country, and rain that makes every green feel brighter.", places: [{ name: "Nongriat root bridge", type: "Hike", note: "The steps are part of the story; start early and carry water." }, { name: "Dawki river", type: "Water + borderlands", note: "Clear water, limestone hills, and a calm sense of the edge." }, { name: "Shillong cafés", type: "City pause", note: "Leave an afternoon for music, books, and a warm cup of tea." }] },
  { id: "hampi", city: "Hampi", country: "Karnataka, India", tag: "Stone + sky", image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85", temp: "30°", weather: "Bright + dry", meta: "Best for 2–4 days", blurb: "A surreal landscape where ancient stone, banana groves, and open sky meet.", places: [{ name: "Virupaksha Temple", type: "Heritage", note: "Let the bazaar street lead you toward the river and temple gopuram." }, { name: "Matanga Hill", type: "Sunrise", note: "A short, steep climb rewarded with a vast early view." }, { name: "Tungabhadra river", type: "Slow afternoon", note: "Find shade, watch the coracles, and let the heat ease." }] },
  { id: "kolkata", city: "Kolkata", country: "West Bengal, India", tag: "Culture + adda", image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=900&q=85", temp: "26°", weather: "Warm + lively", meta: "Best for 3–5 days", blurb: "Bookshops, old neighbourhoods, food stalls, and conversations that run long.", places: [{ name: "College Street", type: "Books + coffee", note: "Make space for a second-hand book and a long, unplanned chat." }, { name: "Kumartuli", type: "Craft quarter", note: "A working neighbourhood where clay quietly becomes ceremony." }, { name: "Victoria Memorial", type: "Architecture", note: "Visit late in the day, when the gardens soften the city around it." }] },
  { id: "mumbai", city: "Mumbai", country: "Maharashtra, India", tag: "Maximum city", image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=900&q=85", temp: "30°", weather: "Humid + bright", meta: "Best for 3–5 days", blurb: "A fast, generous city of sea walls, cinema, neighbourhoods, and excellent food.", places: [{ name: "Marine Drive", type: "Seafront", note: "Walk the curve at blue hour and watch the city exhale." }, { name: "Kala Ghoda", type: "Art + design", note: "A compact loop of galleries, old stone, and good pauses." }, { name: "Sassoon Docks", type: "Market", note: "Go with a local guide and respect the rhythm of a working harbour." }] },
];

const itinerary = [
  { day: "01", title: "Find your bearings", items: ["Tea in the old city", "Walk the Pink City lanes", "Sunset from Nahargarh"] },
  { day: "02", title: "Follow the colour", items: ["Amber Fort before noon", "Lunch in the market quarter", "Craft and courtyard slow time"] },
  { day: "03", title: "Leave room to roam", items: ["A quiet garden morning", "Local thali and a cool pause", "One last golden-hour view"] },
];

export default function Home() {
  const [selectedId, setSelectedId] = useState("jaipur");
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [location, setLocation] = useState("Anywhere");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantText, setAssistantText] = useState("");
  const [messages, setMessages] = useState([{ role: "assistant", text: "Tell me what kind of trip you want to make. I’ll keep it practical, with room for the unexpected." }]);
  const [planned, setPlanned] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const selected = destinations.find((destination) => destination.id === selectedId) ?? destinations[0];
  const filtered = useMemo(() => destinations.filter((destination) => {
    const matchesQuery = `${destination.city} ${destination.country} ${destination.tag}`.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = activeFilter === "All" || (activeFilter === "Slow" && ["kerala", "goa", "meghalaya"].includes(destination.id)) || (activeFilter === "Mountains" && ["ladakh", "meghalaya"].includes(destination.id)) || (activeFilter === "Coast" && ["goa", "mumbai", "kerala"].includes(destination.id)) || (activeFilter === "Culture" && ["jaipur", "varanasi", "hampi", "kolkata"].includes(destination.id));
    return matchesQuery && matchesFilter;
  }), [activeFilter, query]);

  const locate = () => {
    if (!navigator.geolocation) {
      setLocation("Search a place instead");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => setLocation("Near you"),
      () => setLocation("Location unavailable"),
      { timeout: 5000 },
    );
  };

  const askAssistant = () => {
    const prompt = assistantText.trim();
    if (!prompt) return;
    setMessages((current) => [
      ...current,
      { role: "user", text: prompt },
      { role: "assistant", text: `For ${selected.city}, I’d start with three unhurried days: anchor each morning around one place, then leave the afternoon open. I’ve drafted a readable plan below so you can shape it from there.` },
    ]);
    setAssistantText("");
    setPlanned(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f4f0e8] text-[#15263b]">
      <header className="absolute left-0 right-0 top-0 z-30 px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <a href="#top" className="group flex items-center gap-3" aria-label="Elvara home">
            <img src="https://private-us-east-1.manuscdn.com/sessionFile/u3fZSAaz4ITfPLxCeDCfOh/sandbox/C1I6d4idxfg97CFV2RU0Ra_1788415459197_na1fn_L2hvbWUvdWJ1bnR1L3dlYmRldi1zdGF0aWMtYXNzZXRzL2VsdmFyYS1tYXJr.png?x-oss-process=image/resize,w_4096,h_4096/format,webp/quality,q_80&Expires=1790812800&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvdTNmWlNBYXo0SVRmUEx4Q2VEQ2ZPaC9zYW5kYm94L0MxSTZkNGlkeGZnOTdDRlYyUlUwUmFfMTc4ODQxNTQ1OTE5N19uYTFmbl9MMmh2YldVdmRXSjFiblIxTDNkbFltUmxkaTF6ZEdGMGFXTXRZWE56WlhSekwyVnNkbUZ5WVMxdFlYSnIucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfNDA5NixoXzQwOTYvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzkwODEyODAwfX19XX0_&Key-Pair-Id=K2QY5QTL8JSY6C&Signature=MEQCID9PsAizozRgTI1KU3Rrul905VMaqUtMLwQiVvjRpeFAAiBNvKnvPPFe1GVi8k6zW1blMjfY0oeb1qqSDqrtP-Yekw__" alt="" className="h-9 w-9 object-contain brightness-0 invert" />
            <span className="font-display text-xl tracking-[-0.04em] text-white">Elvara</span>
          </a>
          <nav className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white/80 md:flex" aria-label="Primary navigation">
            <a className="transition-colors hover:text-white" href="#explore" style={{ color: "white" }}>Explore</a>
            <a className="transition-colors hover:text-white" href="#weather" style={{ color: "white" }}>Live conditions</a>
            <a className="transition-colors hover:text-white" href="#plan" style={{ color: "white" }}>Make a plan</a>
          </nav>
          <button aria-label="Toggle navigation" className="rounded-full border border-white/30 p-2 text-white md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {menuOpen && <nav className="mx-auto mt-4 flex max-w-[1440px] flex-col gap-3 rounded-2xl bg-[#15263b] p-5 text-sm text-white md:hidden"><a href="#explore" onClick={() => setMenuOpen(false)}>Explore</a><a href="#weather" onClick={() => setMenuOpen(false)}>Live conditions</a><a href="#plan" onClick={() => setMenuOpen(false)}>Make a plan</a></nav>}
      </header>

      <main id="top">
        <section className="relative flex min-h-[720px] items-end overflow-hidden bg-[#1c3851] px-5 pb-14 pt-32 sm:px-8 lg:min-h-[790px] lg:px-12 lg:pb-20">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="auto" aria-hidden="true"><source src="https://cdn.pixabay.com/video/2026/07/23/365704_large.mp4" type="video/mp4" /></video>          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,32,48,.78)_0%,rgba(10,32,48,.43)_47%,rgba(10,32,48,.08)_100%)]" />
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.11)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.11)_1px,transparent_1px)] [background-size:72px_72px]" />
          <div className="relative mx-auto grid w-full max-w-[1440px] gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div className="max-w-[760px] animate-rise">
              <div className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#f3b94c]"><span className="h-px w-10 bg-[#f3b94c]" />A living atlas for curious people</div>
              <h1 className="font-display text-[clamp(4rem,10vw,9rem)] leading-[.83] tracking-[-.07em] text-white">Stay for<br /><em className="text-[#f3b94c]">the next story.</em></h1>
              <p className="mt-8 max-w-[470px] text-base leading-7 text-white/80 sm:text-lg">Explore India and beyond through live conditions, local rhythm, and a plan that leaves room for wandering.</p>
              <div className="mt-9 flex flex-wrap gap-3"><a href="#explore" className="inline-flex items-center gap-3 rounded-full bg-[#1857d5] px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-1 active:scale-[.97]">Find a place <ArrowDownRight size={17} /></a><button onClick={() => setAssistantOpen(true)} className="inline-flex items-center gap-3 rounded-full border border-white/35 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/20"><Sparkles size={16} />Ask the assistant</button></div>
            </div>
            <div className="hidden justify-self-end lg:block"><div className="route-note border-l border-white/45 pl-5 text-white/80"><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#f3b94c]">Your next chapter</p><p className="mt-3 max-w-[200px] font-display text-3xl leading-none text-white">Start with a place that still has a pulse.</p><div className="mt-7 flex items-center gap-2 text-xs"><Navigation size={13} /> 8° 30′ S, 116° 03′ E</div></div></div>
          </div>
          <div className="absolute bottom-6 left-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.25em] text-white/60 sm:left-8 lg:left-12"><span className="h-8 w-px bg-white/50" />Scroll to explore</div>
        </section>

        <section id="explore" className="relative px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[170px_1fr]">
            <div className="hidden lg:block"><div className="sticky top-10 pt-2"><p className="vertical-label flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.3em] text-[#1857d5]"><Compass size={13} />01 / Explore</p><div className="mt-10 h-28 w-px bg-[#1857d5]/25" /><p className="mt-5 text-xs leading-5 text-[#526276]">A field guide to places with their own pace.</p></div></div>
            <div>
              <div className="flex flex-col justify-between gap-7 border-b border-[#15263b]/15 pb-10 md:flex-row md:items-end"><div><p className="text-[11px] font-bold uppercase tracking-[.25em] text-[#1857d5]">Choose your coordinates across India</p><h2 className="mt-3 max-w-[650px] font-display text-5xl leading-[.94] tracking-[-.05em] sm:text-6xl">India is wide.<br /><em>Start somewhere.</em></h2></div><div className="flex w-full max-w-[390px] flex-col gap-3 sm:flex-row"><label className="relative flex-1"><span className="sr-only">Search destinations</span><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1857d5]" size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search a city or feeling" className="h-12 w-full rounded-full border border-[#15263b]/15 bg-white/60 pl-11 pr-4 text-sm outline-none transition focus:border-[#1857d5] focus:ring-2 focus:ring-[#1857d5]/20" /></label><button onClick={locate} className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#15263b]/15 px-4 text-xs font-bold transition hover:border-[#1857d5] hover:text-[#1857d5]"><LocateFixed size={15} />{location}</button></div></div>
              <div className="mt-7 flex flex-wrap gap-2"><span className="mr-2 py-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#526276]">Find your pace</span>{["All", "Slow", "Mountains", "Coast", "Culture"].map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} className={`rounded-full px-4 py-2 text-xs font-bold transition ${activeFilter === filter ? "bg-[#15263b] text-white" : "border border-[#15263b]/15 text-[#526276] hover:border-[#1857d5] hover:text-[#1857d5]"}`}>{filter}</button>)}</div>
              <div className="field-route relative mt-10 grid gap-5 md:grid-cols-3">{filtered.length ? filtered.map((destination, index) => <button key={destination.id} onClick={() => { setSelectedId(destination.id); document.getElementById("destination")?.scrollIntoView({ behavior: "smooth" }); }} className={`group text-left ${destination.id === "varanasi" ? "md:-mt-[0px]" : ""}`}><div className="relative aspect-[.82] overflow-hidden rounded-[2rem] bg-[#d8ddd3]"><img src={destination.image} alt={`${destination.city}, ${destination.country}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#15263b]/75 via-transparent to-transparent" /><div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-[#f4f0e8]/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.15em] text-[#1857d5]"><Compass size={12} />{destination.tag}</div><div className="absolute right-5 top-5 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[.16em] text-white/80"><span className="h-1.5 w-1.5 rounded-full bg-[#f3b94c]" />IND / {String(index + 1).padStart(2, "0")}</div><div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white"><div><p className="font-display text-3xl tracking-[-.04em]">{destination.city}</p><p className="mt-1 text-xs text-white/75">{destination.country} · {destination.meta}</p></div><span className="grid h-10 w-10 place-items-center rounded-full bg-[#f3b94c] text-[#15263b] transition group-hover:rotate-[-45deg]"><ArrowUpRight size={18} /></span></div></div><p className="mt-4 max-w-[270px] text-sm leading-6 text-[#526276]">{destination.blurb}</p></button>) : <div className="rounded-3xl border border-dashed border-[#15263b]/20 p-10 text-[#526276]">No destinations match that search yet. Try “Jaipur”, “Kerala”, or clear the filter.</div>}</div>            </div>
          </div>
        </section>

        <section id="destination" className="bg-[#e5e9df] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start"><div className="lg:sticky lg:top-10"><div className="relative overflow-hidden rounded-[2rem] bg-[#b9d6c7] p-7 sm:p-10"><div className="absolute right-7 top-7 rounded-full bg-[#f3b94c] px-3 py-2 text-[10px] font-bold uppercase tracking-[.16em]">Selected place</div><p className="pt-20 text-[11px] font-bold uppercase tracking-[.25em] text-[#1857d5]">02 / Read the conditions</p><h2 className="mt-3 font-display text-6xl leading-[.87] tracking-[-.06em] sm:text-8xl">{selected.city}<span className="text-[#1857d5]">.</span></h2><p className="mt-5 flex items-center gap-2 text-sm font-bold text-[#526276]"><MapPin size={15} className="text-[#1857d5]" />{selected.country}</p><div className="mt-14 grid grid-cols-2 border-t border-[#15263b]/15 pt-5"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#526276]">Now</p><p className="mt-1 font-display text-4xl">{selected.temp}</p></div><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#526276]">Sky</p><p className="mt-2 flex items-center gap-2 text-sm font-bold"><Sun size={16} className="text-[#d98c1d]" />{selected.weather}</p></div></div><div className="mt-9 flex items-center justify-between border-t border-[#15263b]/15 pt-5 text-xs"><span className="text-[#526276]">Updated just now</span><button onClick={() => setLocation("Weather refreshed")} className="font-bold text-[#1857d5] hover:underline">Refresh ↻</button></div></div></div><div><p id="weather" className="text-[11px] font-bold uppercase tracking-[.25em] text-[#1857d5]">Worth the detour</p><h3 className="mt-3 max-w-[650px] font-display text-5xl leading-[.94] tracking-[-.05em] sm:text-6xl">Three reasons to<br /><em>stay a little longer.</em></h3><div className="mt-10 divide-y divide-[#15263b]/15">{selected.places.map((place, index) => <article key={place.name} className="group grid gap-4 py-7 sm:grid-cols-[64px_1fr_auto] sm:items-start"><span className="font-display text-3xl text-[#1857d5]/60">0{index + 1}</span><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#526276]">{place.type}</p><h4 className="mt-2 font-display text-3xl tracking-[-.04em] transition-colors group-hover:text-[#1857d5]">{place.name}</h4><p className="mt-2 max-w-[430px] text-sm leading-6 text-[#526276]">{place.note}</p></div><ChevronRight className="hidden text-[#1857d5] transition-transform group-hover:translate-x-1 sm:block" /></article>)}</div><div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl bg-[#15263b] p-5 text-white sm:p-6"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#f3b94c] text-[#15263b]"><Sparkles size={19} /></div><p className="flex-1 text-sm leading-6 text-white/80">Weather is a nudge, not a verdict. The best day may be the one that changes.</p><button onClick={() => setAssistantOpen(true)} className="inline-flex items-center gap-2 text-xs font-bold text-[#f3b94c]">Ask about this place <ArrowUpRight size={15} /></button></div></div></div>
        </section>

        <section id="plan" className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28"><div className="mx-auto max-w-[1440px]"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.25em] text-[#1857d5]"><Compass size={14} />03 / Make a plan</p><h2 className="mt-3 max-w-[500px] font-display text-5xl leading-[.94] tracking-[-.05em] sm:text-7xl">A little structure.<br /><em>More room to roam.</em></h2><p className="mt-6 max-w-[390px] text-sm leading-7 text-[#526276]">Ask the assistant for a starting point. It will turn the conversation into a day-by-day itinerary you can actually read.</p><button onClick={() => setAssistantOpen(true)} className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#1857d5] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-1 active:scale-[.97]"><MessageCircle size={16} />Open trip assistant</button></div><div className="relative"><div className="absolute -left-5 top-8 hidden h-[calc(100%-60px)] w-px bg-[#1857d5]/30 lg:block" />{planned ? <div className="animate-rise rounded-[2rem] bg-[#e5e9df] p-6 sm:p-9"><div className="flex items-start justify-between gap-5 border-b border-[#15263b]/15 pb-6"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#1857d5]">Your draft itinerary</p><h3 className="mt-2 font-display text-4xl tracking-[-.05em]">Three days in {selected.city}</h3></div><CalendarDays className="text-[#1857d5]" /></div><div className="divide-y divide-[#15263b]/15">{itinerary.map((day) => <div key={day.day} className="grid gap-4 py-6 sm:grid-cols-[54px_1fr]"><span className="font-display text-3xl text-[#1857d5]">{day.day}</span><div><h4 className="font-display text-2xl">{day.title}</h4><ul className="mt-3 grid gap-2 text-sm text-[#526276] sm:grid-cols-3">{day.items.map((item) => <li key={item} className="flex gap-2"><Check size={15} className="mt-0.5 shrink-0 text-[#1857d5]" />{item}</li>)}</ul></div></div>)}</div><button onClick={() => setPlanned(false)} className="mt-2 text-xs font-bold text-[#1857d5] hover:underline">Start over</button></div> : <div className="rounded-[2rem] border border-[#15263b]/15 bg-white/45 p-7 sm:p-10"><div className="flex h-64 flex-col items-center justify-center border border-dashed border-[#1857d5]/30 text-center"><div className="route-line mb-5 h-12 w-24 border-b-2 border-dashed border-[#1857d5]" /><p className="font-display text-3xl">Your next few days<br /><em>could look like this.</em></p><button onClick={() => setAssistantOpen(true)} className="mt-6 text-xs font-bold uppercase tracking-[.16em] text-[#1857d5]">Generate a plan →</button></div></div>}</div></div></div></section>
      </main>

      <footer className="border-t border-[#15263b]/15 bg-[#f4f0e8] px-5 py-10 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><div className="flex items-center gap-3"><img src="https://3000-imqjow4swlhtwt0fggcuw-4e6267e1.sg2.manus.computer/manus-storage/elvara-mark_a40c0912.png" alt="" className="h-7 w-7 object-contain" /><span className="font-display text-2xl tracking-[-.05em]">elvara</span></div><p className="mt-3 text-xs text-[#526276]">A softer way to find your way through.</p></div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#526276]">Built for the curious · 2026</p></div></footer>

      {assistantOpen && <div className="fixed inset-0 z-50 flex items-end justify-end bg-[#15263b]/35 p-0 backdrop-blur-[2px] sm:p-5" role="dialog" aria-modal="true" aria-label="Trip assistant"><div className="flex max-h-[90vh] w-full max-w-[470px] flex-col rounded-t-[2rem] bg-[#f4f0e8] shadow-2xl sm:rounded-[2rem]"><div className="flex items-center justify-between border-b border-[#15263b]/15 px-6 py-5"><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#1857d5]">Atlas assistant</p><h2 className="mt-1 font-display text-2xl">Plan around {selected.city}</h2></div><button onClick={() => setAssistantOpen(false)} className="rounded-full border border-[#15263b]/15 p-2" aria-label="Close assistant"><X size={16} /></button></div><div className="flex-1 space-y-4 overflow-auto px-6 py-5">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`max-w-[88%] rounded-2xl p-4 text-sm leading-6 ${message.role === "user" ? "ml-auto bg-[#1857d5] text-white" : "bg-[#e5e9df] text-[#15263b]"}`}>{message.text}</div>)}</div><div className="border-t border-[#15263b]/15 p-5"><div className="flex gap-2"><input value={assistantText} onChange={(e) => setAssistantText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") askAssistant(); }} placeholder="e.g. Make it slow and food-led" className="min-w-0 flex-1 rounded-full border border-[#15263b]/15 bg-white/60 px-4 py-3 text-sm outline-none focus:border-[#1857d5]" /><button onClick={askAssistant} className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#1857d5] text-white transition hover:scale-105" aria-label="Send message"><Send size={16} /></button></div><p className="mt-3 text-[10px] text-[#526276]">A prototype assistant with a thoughtful fallback plan.</p></div></div></div>}
    </div>
  );
}
