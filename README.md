# Unravel WebApp Challenge

This project is a **single-page application** built with **React 19 + TypeScript** and powered by **Vite**.
It implements a **responsive room listing** interface with infinite scrolling, optimized media loading, and scalable state management using Redux Toolkit.

Users can explore hotel rooms—each containing a title, description, price, images, videos, and variants—optimized for performance and smooth UX.

---
**Application image**:

<p align="center">
	<img src="https://github.com/dayana-sog/rooms-unravel/blob/main/public/images/Captura%20de%20ecr%C3%A3%202025-12-06%20223411.png" />
</p>

---

### 🚀 Tech Stack

#### **Framework & Tooling**

* React 19
* TypeScript
* Vite

#### **State Management**

* Redux Toolkit (RTK) – slices, reducers, async thunks
* react-redux

#### **Styling & UI**

* Tailwind CSS 4
* Shadcn/Radix UI primitives
* lucide-react icons
* clsx, tailwind-merge, class-variance-authority (utilities)

#### **UX Enhancements**

* IntersectionObserver for lazy-loaded media
* embla-carousel (optional sliders)

---

## 🧩 Challenge Requirements — Implemented

#### ✔️ Room Listing Component

* Reusable component for displaying rooms
* Shows: name, description, price, variants, images, and videos

#### ✔️ Media Priority Rule (as defined in challenge)

1. If a room has **videos**, show them (`video_url`)
2. If no videos, show **images** (`room_images`)
3. If no media: show nothing

#### ✔️ Image Optimization

* Lazy loading via `loading="lazy"`
* Responsive images using `srcset`
* Placeholder skeleton while loading

#### ✔️ Video Optimization

* Videos load *only when visible*
* Autoplay when entering viewport
* Pause when leaving viewport
* Implemented with **IntersectionObserver**

#### ✔️ Infinite Scrolling

* Automatically fetches additional data as user scrolls
* Uses large static JSON dataset (100+ items)
* Debounced scroll handling

#### ✔️ Loading & Error Handling

* Skeleton loaders
* Fallback error UI
* Thunks handle fetch errors gracefully

#### ✔️ Performance Techniques

* No media preloading outside viewport
* Memoized components (`React.memo`, `useMemo`)
* RTK store normalized for large datasets
* Lazy-loaded heavy components
* Network usage minimized with viewport-driven fetching

---

## 📁 Project Structure

```
src/
 ├─ components/        # UI components (RoomCard, Skeleton, LazyMedia, etc.)
 ├─ hooks/             # infinite scroll, media observers, responsive helpers
 ├─ store/
 │   ├─ slices/        # room slice
 │   └─ index.ts       # main Redux store
 ├─ lib/               # shared utilities
 ├─ types/             # TypeScript types
 ├─ App.tsx
 └─ main.tsx
public/
 └─ data/sample.json   # mock dataset with 100+ rooms
```

---

## ▶️ Getting Started

#### Install dependencies

```bash
npm install
```

#### Run development server

```bash
npm run dev
```

#### Production build

```bash
npm run build
```

#### Preview production build

```bash
npm run preview
```

---

## 🌐 Deployment

A live version of the application is deployed at:

**<https://rooms-unravel.vercel.app/>**

---

## 🔍 Performance Optimization Summary

This project implements all performance-related requirements of the challenge:

* **Lazy loading via IntersectionObserver**
* **Optimized video autoplay/pause behavior**
* **Debounced infinite scroll**
* **Memoized media components**
* **Lazy import of heavy UI parts**
* **Skeleton placeholders while loading**
* **No preloading of off-screen content**

---

## ✔️ Final Notes

This implementation covers all main challenge requirements and focuses on correctness, scalability, and performance rather than UI refinement (as recommended in the instructions).

Feel free to explore and extend the project further.


----------

Made with ♥ by Dayana Gonçalves 👋 