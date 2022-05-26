import Head from "next/head";
import KamarNotices from "kamar-notices";
import styles from "../styles/notices.module.css";
import { useEffect } from "react";

export async function getStaticProps() {
  const notices = new KamarNotices("https://kamar.camhigh.school.nz");
  return {
    props: {
      notices: await notices.getNotices(),
    },
    revalidate: 1,
  };
}

export default function NoticeScreen({ notices }) {
  useEffect(() => {
    let slide = 0;
    setInterval(() => {
      let notice = document.querySelectorAll("." + styles.notice);
      notice.forEach((e) => {
        e.classList.remove(styles.active);
      });
      if (notice[slide + 1]) {
        slide += 1;
      } else {
        slide = 0;
      }
      notice[slide].classList.add(styles.active);
      let contentElement = notice[slide].querySelectorAll(
        "." + styles.noticeContent
      )[0];
      setTimeout(() => {
        contentElement.scrollTo({
          top: contentElement.scrollHeight,
          behavior: "smooth",
        });
      }, 7.5 * 1000);
      setTimeout(() => {
        contentElement.scrollTo({
          top: 0,
        });
      }, 16 * 1000);
    }, 15 * 1000);
  });

  return (
    <div className="container">
      <Head>
        <title>CHS Notices Screen</title>
        <meta name="description" content="Displays notices on a TV." />
      </Head>
      <div className={styles.notices}>
        {notices.map((notice, i) => {
          return (
            <div
              key={i}
              className={`${styles.notice} ${i == 0 ? styles.active : ""}`}
            >
              <h1 className={styles.noticeTitle}>{notice.title}</h1>
              <p className={styles.noticeContent}>{notice.content}</p>
              <div className={styles.noticeData}>
                {notice.for} &#8226; {notice.staff}
              </div>
            </div>
          );
        })}
      </div>
      <main className={styles.main}></main>
    </div>
  );
}
