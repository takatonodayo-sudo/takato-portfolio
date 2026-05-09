const progress = document.querySelector(".progress span");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const modalData = {
  ads: {
    title: "Meta広告運用改善",
    lead: "広告配信の数字を見ながら、訴求・配信設計・予算配分を調整。月30万円規模のアカウント運用を担当し、CPA改善とCTR向上を目指しました。",
    points: ["担当範囲: Meta広告運用、数値確認、改善提案", "使用領域: Meta広告マネージャー、Google広告、レポート作成", "見せ方: 成果だけでなく、改善のプロセスを言語化"]
  },
  writing: {
    title: "介護・副業・レビュー記事",
    lead: "介護現場、子育て、在宅ワークなどの実体験をもとに、読者が自分ごと化しやすい記事やSNS文面を制作します。",
    points: ["対応範囲: note記事、SNS投稿、商品レビュー、公式LINE文面", "強み: 経験をもとにした共感性と、読み進めやすい構成", "見せ方: ジャンルごとに文章の目的と届けたい相手を整理"]
  },
  care: {
    title: "介護現場でのリーダーシップ",
    lead: "18年間の介護経験を土台に、チーム運営、人材育成、利用者理解に取り組んできました。現場を知っているからこそ、介護領域の発信にも具体性を持たせられます。",
    points: ["経験: ユニットリーダー、主任として現場運営に従事", "対応範囲: 介護職向け教材、研修資料、現場目線の記事制作", "見せ方: 肩書きだけでなく、マーケティングに転用できる力を明示"]
  }
};

function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  progress.style.width = `${Math.min(100, ratio * 100)}%`;
}

function updateActiveNav() {
  const current = sections
    .filter((section) => section.getBoundingClientRect().top < window.innerHeight * 0.42)
    .at(-1);

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", current && link.getAttribute("href") === `#${current.id}`);
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.querySelectorAll(".filter-tabs button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".filter-tabs button").forEach((tab) => tab.classList.remove("active"));
    button.classList.add("active");

    document.querySelectorAll(".work-item").forEach((item) => {
      item.classList.toggle("is-hidden", filter !== "all" && item.dataset.category !== filter);
    });
  });
});

const dialog = document.querySelector(".work-modal");
const modalContent = document.querySelector(".modal-content");

document.querySelectorAll("[data-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    const data = modalData[button.dataset.modal];
    modalContent.innerHTML = `
      <p class="eyebrow">Case Detail</p>
      <h3>${data.title}</h3>
      <p>${data.lead}</p>
      <ul>${data.points.map((point) => `<li>${point}</li>`).join("")}</ul>
    `;
    dialog.showModal();
    document.body.classList.add("modal-open");
  });
});

document.querySelector(".modal-close").addEventListener("click", () => dialog.close());

dialog.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
});

window.addEventListener("scroll", () => {
  updateProgress();
  updateActiveNav();
});

updateProgress();
updateActiveNav();
