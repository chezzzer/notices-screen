import Head from "next/head";
import styles from "../styles/notices.module.css";
import { useState, useEffect } from "react";

export default function NoticeScreen({ notices }) {
  //data
  const [data, setData] = useState([]);

  async function getNotices() {
    notices = await fetch("/api/notices");
    setData(await notices.json());
  }

  useEffect(() => {
    getNotices();
  }, [false]);

  //slider
  useEffect(() => {
    let slide = 0;
    const id = setInterval(() => {
      let notice = document.querySelectorAll("." + styles.notice);
      notice.forEach((e) => {
        e.classList.remove(styles.active);
      });
      if (notice[slide + 1]) {
        slide += 1;
      } else {
        getNotices();
        slide = 0;
      }
      notice[slide].classList.add(styles.active);

      let contentElement = notice[slide].querySelectorAll(
        "." + styles.noticeContent
      )[0];
      let titleElement = notice[slide].querySelectorAll(
        "." + styles.noticeTitle
      )[0];
      setTimeout(() => {
        contentElement.scrollTo({
          top: contentElement.scrollHeight,
          behavior: "smooth",
        });
        titleElement.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      }, 7.5 * 1000);
      setTimeout(() => {
        titleElement.scrollTo({
          left: contentElement.scrollWidth,
          behavior: "smooth",
        });
      }, 2.5 * 1000);
      setTimeout(() => {
        contentElement.scrollTo({
          top: 0,
        });
      }, 16 * 1000);
    }, 15 * 1000);
    return () => clearInterval(id);
  }, [data]);

  return (
    <div className="container">
      <Head>
        <title>CHS Notices Screen</title>
        <meta name="description" content="Displays notices on a TV." />
      </Head>
      <div className={styles.notices}>
        {data.map((notice, i) => {
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
