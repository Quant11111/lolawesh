"use client";

import { useState } from "react";
import Image from "next/image";
import photos from "./photos.json";

const CDN = "https://d18rkjvuv0otht.cloudfront.net";

const CATEGORIES = [
  { id: "all", label: "~* ToUt VoIr *~" },
  { id: "enfance", label: "👶 EnFaNcE" },
  { id: "goth", label: "🖤 GoTh ErA" },
  { id: "the-end", label: "👑 ThE eNd" },
];

// Pre-computed deterministic "random" values based on index
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 9301 + salt * 4973) * 49297;
  return Math.round((x - Math.floor(x)) * 1000) / 1000;
}

const STARS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: Math.round(seeded(i, 1) * 100),
  delay: Math.round(seeded(i, 2) * 10),
  duration: Math.round(5 + seeded(i, 3) * 10),
  size: Math.round(8 + seeded(i, 4) * 16),
}));

const MUSIC_BARS = Array.from({ length: 12 }, (_, i) => ({
  speed: Math.round((0.3 + seeded(i, 10) * 0.5) * 100) / 100,
  height: Math.round(4 + seeded(i, 11) * 12),
}));

const VISITOR_COUNT = 8293;

function StarField() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {STARS.map((star) => (
        <span
          key={star.id}
          className="absolute text-yellow-300 opacity-60"
          style={{
            left: `${star.left}%`,
            fontSize: `${star.size}px`,
            animation: `star-fall ${star.duration}s linear ${star.delay}s infinite`,
          }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}

function VisitorCounter() {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span>👁️</span>
      <span className="font-mono bg-black/50 px-2 py-1 rounded border border-[var(--sky-pink)]">
        {String(VISITOR_COUNT)
          .split("")
          .map((d, i) => (
            <span
              key={i}
              className="inline-block bg-[#1a0033] px-1 mx-[1px] text-[var(--sky-cyan)] border border-[var(--sky-purple)]/50 rounded-sm"
            >
              {d}
            </span>
          ))}
      </span>
      <span className="text-[var(--sky-pink)]">visiteurs</span>
    </div>
  );
}

function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="bg-black/60 border border-[var(--sky-purple)] rounded-lg p-3 text-xs">
      <div className="text-[var(--sky-gold)] mb-1 font-bold">
        🎵 Ma PlAyLiSt 🎵
      </div>
      <div className="text-[var(--sky-pink)] mb-2 truncate italic">
        {playing ? "♪ Evanescence - Bring Me To Life ♪" : "Appuie sur play ~*~"}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setPlaying(!playing)}
          className="bg-[var(--sky-purple)] hover:bg-[var(--sky-pink)] px-3 py-1 rounded text-white transition-colors"
        >
          {playing ? "⏸" : "▶"}
        </button>
        <button className="bg-[var(--sky-dark)] border border-[var(--sky-purple)] px-3 py-1 rounded text-white hover:bg-[var(--sky-purple)] transition-colors">
          ⏭
        </button>
      </div>
      {playing && (
        <div className="mt-2 flex gap-[2px] items-end h-4">
          {MUSIC_BARS.map((bar, i) => (
            <div
              key={i}
              className="w-1 bg-[var(--sky-pink)] rounded-full"
              style={{
                animation: `float ${bar.speed}s ease-in-out infinite`,
                height: `${bar.height}px`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PhotoCard({
  photo,
  index,
}: {
  photo: (typeof photos)[0];
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <>
      <article
        className={`photo-card bg-gradient-to-br ${
          isEven ? "from-[#1a0033] to-[#0d001a]" : "from-[#0d001a] to-[#1a0033]"
        } border-2 border-[var(--sky-purple)]/50 rounded-2xl overflow-hidden animate-pulse-border`}
      >
        <div
          className="relative cursor-pointer group"
          onClick={() => setIsOpen(true)}
        >
          <Image
            src={`${CDN}/${photo.url}`}
            alt={photo.name}
            width={800}
            height={600}
            className="w-full h-auto object-cover group-hover:brightness-110 transition-all"
            sizes="(max-width: 768px) 100vw, 600px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <span className="text-xs bg-[var(--sky-purple)]/80 px-2 py-1 rounded-full">
              {photo.category === "enfance" && "👶"}
              {photo.category === "goth" && "🖤"}
              {photo.category === "the-end" && "👑"} {photo.category}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h2 className="text-xl font-bold animate-glow mb-3">
            ~*~ {photo.name} ~*~
          </h2>
          <div className="sky-separator mb-3" />
          <p className="text-sm leading-relaxed text-gray-200 whitespace-pre-line">
            {photo.description}
          </p>
          <div className="sky-separator mt-3 mb-3" />
          <div className="flex items-center justify-between text-xs text-[var(--sky-pink)]">
            <span className="animate-blink">❤ {42 + index * 7} kiffs</span>
            <span>💬 {3 + index * 2} coms</span>
            <span>📅 {2003 + Math.floor(index / 4)}</span>
          </div>
        </div>
      </article>

      {/* Lightbox */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-[var(--sky-pink)] transition-colors z-10"
            >
              ✕ fErMeR
            </button>
            <Image
              src={`${CDN}/${photo.url}`}
              alt={photo.name}
              width={1200}
              height={900}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg border-2 border-[var(--sky-purple)]"
              sizes="100vw"
            />
            <p className="text-center text-[var(--sky-pink)] mt-2 animate-glow font-bold">
              ~*~ {photo.name} ~*~
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function Guestbook() {
  const fakeComments = [
    {
      author: "xX_DaRk_AnGeL_Xx",
      text: "tro bel ton blog jador lé foto!! bsx 💋",
      date: "14/03/2006",
    },
    {
      author: "~PrInCeSs_Du_69~",
      text: "cc ta fo remplir ma fiche! lache dé com sur mon sky stp 😍",
      date: "12/03/2006",
    },
    {
      author: "le-bg-du-13",
      text: "wesh wesh sa va ou kwa? ton sky il gère sa mère ptdr",
      date: "10/03/2006",
    },
    {
      author: "MiSs_ChOcOlAt",
      text: "kikou!! jadore la foto du lutin mdrr tu gère!!! bsx bsx",
      date: "08/03/2006",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#1a0033] to-[#0d001a] border-2 border-[var(--sky-gold)]/50 rounded-2xl p-5">
      <h3 className="text-xl font-bold text-[var(--sky-gold)] text-center mb-4 animate-glow">
        📝 LiVrE d&apos;Or 📝
      </h3>
      <div className="space-y-3 mb-4">
        {fakeComments.map((c, i) => (
          <div
            key={i}
            className="bg-black/40 rounded-lg p-3 border border-[var(--sky-purple)]/30"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-[var(--sky-cyan)] font-bold text-sm">
                {c.author}
              </span>
              <span className="text-gray-500 text-xs">{c.date}</span>
            </div>
            <p className="text-sm text-gray-300">{c.text}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--sky-purple)]/30 pt-3">
        <textarea
          placeholder="lAcHe ToN cOm IcI ~*~"
          className="w-full bg-black/50 border border-[var(--sky-purple)]/50 rounded-lg p-3 text-sm text-white placeholder-[var(--sky-pink)]/50 resize-none focus:outline-none focus:border-[var(--sky-pink)] transition-colors"
          rows={3}
        />
        <button className="mt-2 bg-gradient-to-r from-[var(--sky-pink)] to-[var(--sky-purple)] hover:from-[var(--sky-purple)] hover:to-[var(--sky-pink)] px-6 py-2 rounded-full text-white font-bold text-sm transition-all hover:scale-105">
          ✨ EnVoYeR ✨
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [category, setCategory] = useState("all");

  const filteredPhotos =
    category === "all" ? photos : photos.filter((p) => p.category === category);

  return (
    <div className="min-h-screen stars-bg relative">
      <StarField />

      {/* Marquee */}
      <div className="bg-gradient-to-r from-[var(--sky-dark)] via-[var(--sky-purple)]/20 to-[var(--sky-dark)] border-b border-[var(--sky-purple)]/30 overflow-hidden py-1 relative z-10">
        <div className="animate-marquee whitespace-nowrap text-sm">
          ✨💖 BiEnVeNuE sUr Le SkYbLoG dE LoLa !! LâChE dEs CoMs !! 💖✨ ~*~ nE
          cOpIe PaS mOn StYlE ~*~ ✨💖 AdD mOi SuR mSn !! 💖✨ ~*~ tU kIfFeS ?
          bAh LâChE uN cOm !! ~*~
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="mb-2 text-[var(--sky-pink)] text-sm">
            ·411·. ★彡 .·411·.
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold animate-glow mb-3 leading-tight">
            ~*~ LoLaWeSh ~*~
          </h1>
          <p className="text-lg text-[var(--sky-cyan)] mb-1 italic">
            &quot;On naît alpha ou on naît pas&quot;
          </p>
          <p className="text-sm text-[var(--sky-pink)]">
            ★ dEpUiS 1997 ★ GoTh 4 LiFe ★ TeRrEuR dU qUaRtIeR ★
          </p>
          <div className="sky-separator mt-4" />
        </header>

        {/* Profile + sidebar layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="space-y-4">
            {/* Profile card */}
            <div className="bg-gradient-to-br from-[#1a0033] to-[#0d001a] border-2 border-[var(--sky-pink)]/50 rounded-2xl p-4 text-center animate-pulse-border">
              <div className="relative w-28 h-28 mx-auto mb-3 rounded-full overflow-hidden border-3 border-[var(--sky-gold)]">
                <Image
                  src={`${CDN}/${photos[photos.length - 1].url}`}
                  alt="Ma foto de profil"
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <h2 className="font-bold text-[var(--sky-gold)] animate-rainbow text-lg">
                xX_LoLa_Xx
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                PrInCeSsE dEs TéNèBrEs
              </p>
              <div className="sky-separator my-3" />
              <div className="text-xs space-y-1 text-gray-300 text-left">
                <p>
                  📍{" "}
                  <span className="text-[var(--sky-pink)]">
                    Quelque part dans les ténèbres
                  </span>
                </p>
                <p>
                  🎂{" "}
                  <span className="text-[var(--sky-pink)]">
                    Depuis toujours
                  </span>
                </p>
                <p>
                  💀{" "}
                  <span className="text-[var(--sky-pink)]">Goth & fière</span>
                </p>
                <p>
                  🎵{" "}
                  <span className="text-[var(--sky-pink)]">
                    Evanescence, Cradle of Filth
                  </span>
                </p>
              </div>
              <div className="sky-separator my-3" />
              <VisitorCounter />
            </div>

            {/* Music Player */}
            <MusicPlayer />

            {/* Categories */}
            <div className="bg-gradient-to-br from-[#1a0033] to-[#0d001a] border-2 border-[var(--sky-purple)]/50 rounded-2xl p-4">
              <h3 className="font-bold text-[var(--sky-gold)] mb-3 text-center text-sm">
                ✦ MeS cAtÉgOrIeS ✦
              </h3>
              <div className="flex flex-col gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-bold transition-all text-left ${
                      category === cat.id
                        ? "bg-gradient-to-r from-[var(--sky-pink)] to-[var(--sky-purple)] text-white shadow-lg shadow-[var(--sky-pink)]/30"
                        : "bg-black/30 text-gray-300 hover:bg-[var(--sky-purple)]/20 border border-[var(--sky-purple)]/30"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Friends */}
            <div className="bg-gradient-to-br from-[#1a0033] to-[#0d001a] border-2 border-[var(--sky-purple)]/50 rounded-2xl p-4">
              <h3 className="font-bold text-[var(--sky-gold)] mb-3 text-center text-sm">
                💖 MeS tOp FrIeNdS 💖
              </h3>
              <div className="text-xs space-y-2 text-gray-300">
                <p>
                  🌟{" "}
                  <span className="text-[var(--sky-cyan)]">xX_DéBoRaH_Xx</span>{" "}
                  <span className="text-gray-500">(parfois traîtresse)</span>
                </p>
                <p>
                  🌟{" "}
                  <span className="text-[var(--sky-cyan)]">~JuLiE_ViKiNg~</span>
                </p>
                <p>
                  🌟{" "}
                  <span className="text-[var(--sky-cyan)]">
                    Lucifer_le_chat
                  </span>
                </p>
                <p>
                  🌟{" "}
                  <span className="text-[var(--sky-cyan)]">Le-MeC-ChElOu</span>
                </p>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="space-y-6">
            {/* Category title */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[var(--sky-pink)] animate-glow">
                {CATEGORIES.find((c) => c.id === category)?.label}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {filteredPhotos.length} aRtIcLe
                {filteredPhotos.length > 1 ? "s" : ""} ~*~
              </p>
            </div>

            {/* Photo grid */}
            {filteredPhotos.map((photo, index) => (
              <PhotoCard key={photo.url} photo={photo} index={index} />
            ))}

            {/* Guestbook */}
            <div className="sky-separator my-6" />
            <Guestbook />
          </main>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 mb-6 space-y-3">
          <div className="sky-separator" />
          <p className="text-sm text-gray-500 mt-4">
            ~*~ CrÉé aVeC 🖤 eT dU mAqUiLlAgE nOiR ~*~
          </p>
          <p className="text-xs text-gray-600">
            © 2006 - Le SkYbLoG dE LoLa - nE cOpIe PaS !!
          </p>
          <p className="text-xs text-[var(--sky-pink)] animate-blink">
            ✨ Tu KiFfEs ? AlOrS lÂcHe Un CoM !! ✨
          </p>
          <div className="text-xs text-gray-700 mt-2">
            ·411·. ★彡 .·411·. ★彡 .·411·.
          </div>
        </footer>
      </div>
    </div>
  );
}
