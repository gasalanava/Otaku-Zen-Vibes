const SITE_CONFIG = {
  youtubeChannelUrl: "https://www.youtube.com/@OtakuZenVibes",
  youtubeVideosUrl: "https://www.youtube.com/@OtakuZenVibes/videos",
  featuredVideoId: "CGwweLARPCg",

  /*
    Para que el mosaico muestre automáticamente los últimos 3 videos, pega aquí el Channel ID real de YouTube.
    Debe empezar por "UC", por ejemplo: "UCxxxxxxxxxxxxxxxxxxxxxx".

    El handle @OtakuZenVibes no siempre sirve para el feed RSS. YouTube usa Channel ID para:
    https://www.youtube.com/feeds/videos.xml?channel_id=UC...
  */
  youtubeChannelId: "",

  fallbackVideos: [
    {
      title: "Welcome to Otaku Zen Vibes",
      url: "https://www.youtube.com/watch?v=CGwweLARPCg",
      thumbnail: "https://img.youtube.com/vi/CGwweLARPCg/hqdefault.jpg",
      meta: "Featured video"
    },
    {
      title: "Latest uploads on YouTube",
      url: "https://www.youtube.com/@OtakuZenVibes/videos",
      thumbnail: "assets/hero-banner.webp",
      meta: "Videos page"
    },
    {
      title: "Explore the full Otaku Zen Vibes journey",
      url: "https://www.youtube.com/@OtakuZenVibes",
      thumbnail: "assets/about-collage.webp",
      meta: "Main channel"
    }
  ]
};

const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open menu");
  });
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const latestVideosContainer = document.getElementById("latestVideos");

function videoCardTemplate(video) {
  const title = escapeHtml(video.title || "Otaku Zen Vibes video");
  const url = video.url || SITE_CONFIG.youtubeChannelUrl;
  const thumbnail = video.thumbnail || "assets/hero-banner.webp";
  const meta = escapeHtml(video.meta || "YouTube");

  return `
    <a class="video-card reveal is-visible" href="${url}" target="_blank" rel="noopener">
      <div class="video-thumb">
        <img src="${thumbnail}" alt="${title}" loading="lazy">
        <span class="video-play" aria-hidden="true">▶</span>
      </div>
      <div class="video-content">
        <h3>${title}</h3>
        <p>${meta}</p>
      </div>
    </a>
  `;
}

function renderVideos(videos) {
  if (!latestVideosContainer) return;
  latestVideosContainer.innerHTML = videos.slice(0, 3).map(videoCardTemplate).join("");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

async function loadLatestVideos() {
  if (!latestVideosContainer) return;

  if (!SITE_CONFIG.youtubeChannelId) {
    renderVideos(SITE_CONFIG.fallbackVideos);
    return;
  }

  try {
    const rssUrl = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${SITE_CONFIG.youtubeChannelId}`);
    const endpoint = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;
    const response = await fetch(endpoint, { cache: "no-store" });

    if (!response.ok) throw new Error("Unable to read YouTube RSS feed.");

    const data = await response.json();
    const videos = (data.items || []).slice(0, 3).map((item) => ({
      title: item.title,
      url: item.link,
      thumbnail: item.thumbnail,
      meta: new Date(item.pubDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric"
      })
    }));

    renderVideos(videos.length ? videos : SITE_CONFIG.fallbackVideos);
  } catch (error) {
    renderVideos(SITE_CONFIG.fallbackVideos);
  }
}

loadLatestVideos();
