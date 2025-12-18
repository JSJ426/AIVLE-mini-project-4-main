"use client";

import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import "./css/books.css";
import api from "./api/apiClient"; // ✅ apiClient 사용

export default function Home() {
  const [books, setBooks] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);

  // 페이지 상태
  const [page, setPage] = useState(1);
  const size = 28;

  // AccessToken 보유 여부
  const [hasToken, setHasToken] = useState(false);

  // mount 시 토큰 체크
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setHasToken(!!token);
  }, []);

  // ✅ API 호출 함수 (localhost 하드코딩 제거)
  async function fetchBooks(currentPage) {
    try {
      setLoading(true);

      // apiClient의 baseURL(NEXT_PUBLIC_API_BASE_URL) + "/books" 로 호출됨
      const res = await api.get(`/books?page=${currentPage}&size=${size}`);

      // axios는 res.data에 실제 데이터가 들어있음
      const json = res.data;
      const list = json.data?.books ?? [];

      setBooks(list);
      setTotalItems(json.data?.totalItems ?? 0);
    } catch (err) {
      console.error("도서 목록 불러오기 실패:", err);
    } finally {
      setLoading(false);
    }
  }

  // page 변경될 때마다 API 다시 호출
  useEffect(() => {
    fetchBooks(page);
  }, [page]);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(totalItems / size);

  return (
    <main className="container py-5 home-container">
      {/* 헤더 */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-4">
        <h2 className="section-title m-0">📚 도서 목록</h2>

        <div className="flex justify-end items-center gap-3">
          {/* 로그인한 사용자만 도서 등록 버튼 표시 */}
          {hasToken && (
            <button
              className="badge rounded-pill text-bg-light border books-count-badge"
              onClick={() => (window.location.href = "/new_post")}
            >
              도서 등록
            </button>
          )}

          <span className="badge rounded-pill text-bg-light border books-count-badge">
            {loading ? "불러오는 중..." : `총 ${totalItems}권`}
          </span>
        </div>
      </div>

      {/* 로딩 */}
      {loading && (
        <div className="d-flex align-items-center gap-2 text-secondary">
          <div className="spinner-border spinner-border-sm" role="status" />
          <span>불러오는 중...</span>
        </div>
      )}

      {/* 빈 화면 */}
      {!loading && books.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <div className="empty-title">표시할 도서가 없습니다.</div>
          <div className="empty-desc">잠시 후 다시 시도해 주세요.</div>
        </div>
      )}

      {/* 도서 목록 */}
      {!loading && books.length > 0 && (
        <div className="row g-4">
          {books.map((book) => (
            <div
              key={book.bookId}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
            >
              <div
                className="book-card border- shadow-sm"
                role="button"
                onClick={() =>
                  (window.location.href = `/post_view/${book.bookId}`)
                }
              >
                {/* 이미지 */}
                <div className="book-thumb">
                  <img
                    src={book.imageUrl}
                    alt={book.title || "제목 없음"}
                    className="book-image"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement?.classList.add(
                        "thumb-fallback"
                      );
                    }}
                  />
                </div>

                {/* 제목 + 카테고리 배치 */}
                <div className="card-body py-2">
                  {/* 책 제목 */}
                  <h5 className="card-title book-title mb-1">
                    {book.title || "제목 없음"}
                  </h5>

                  {/* 카테고리 배지 */}
                  <span
                    className="badge bg-secondary ms-2"
                    style={{
                      fontSize: "0.75rem",
                      borderRadius: "10px",
                      padding: "4px 8px",
                      opacity: 0.85,
                    }}
                  >
                    {book.category || "미분류"}
                  </span>
                </div>

                {/* 푸터 */}
                <div className="card-footer bg-transparent border-0 pt-0 pb-2">
                  <span className="read-more">자세히 보기 →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 페이지네이션 */}
      {!loading && totalItems > 0 && (
        <div className="pagination-container d-flex justify-content-center">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            shape="rounded"
            size="large"
          />
        </div>
      )}
    </main>
  );
}
