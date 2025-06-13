// store/reviewStore.ts
import { create } from 'zustand';
import toast from "react-hot-toast";
import {tree} from "next/dist/build/templates/app-page";

type ReviewStore = {
  reviews: Review[];
  loading: boolean;
  totalReviews: number;
  getReviews: () => Promise<void>;
  createReview: (review: BodySetReview) => Promise<boolean>;
  updateReview: (id: number, command: string) => Promise<void>;
  deleteReview: (id: number) => Promise<void>;
  filter: (accountId: string , params: {[key: string]: string}) => Promise<void>;
  updateStatus: (id: string, status: string) => Promise<boolean>;
};

export const useReviewStore = create<ReviewStore>((set) => ({
  reviews: [],
  loading: false,
  totalReviews: 0,
  updateStatus: async (id: string, status: string)=> {
    set({loading: true});
    try {
      const requestReviews = await fetch(`/api/reviews/status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({status})
      })
      const { message } = (await requestReviews.json());
      toast.success(message);
      set({loading: false});
      return true;
    } catch (e) {
      toast.error((e as Error).message);
      set({loading: false});
      return false;
    }
  },
  filter: async (accountId: string , params: {[key: string]: string})=> {
    set({ loading: true });
    try {
      const requestReviews = await fetch(`/api/reviews/${accountId}?${new URLSearchParams(params)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const { reviews, totalElements } = (await requestReviews.json());
      console.log(reviews);
      set({reviews: reviews, totalReviews: totalElements});
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      set({ loading: false });
    }

  },

  getReviews: async () => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/reviews`, { cache: 'no-store' });
      const data = await res.json();
      set({ reviews: data.reviews });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      set({ loading: false });
    }
  },

  createReview: async (formData: BodySetReview) => {
    try {
      const res = await fetch(`/api/s/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const {review, message} = await res.json();
      if (!res.ok) throw new Error(message);
      set((state) => ({reviews: [review, ...state.reviews]}))
      toast.success(message)
      return true;
    } catch (err) {
      toast.error((err as Error).message);
      return false;
    }
  },
  updateReview: async (id: number, comment: string) => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: 'PUT', // hoặc PATCH tùy backend bạn
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({comment})
      });

      const { message} = await res.json();

      if (!res.ok) throw new Error(message);
      toast.success("Cập nhật thành công")
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      set({ loading: false });
    }
  },

  deleteReview: async (id: number) => {
    set({ loading: true });
    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE'
      });
      const {message} = await res.json();

      if (!res.ok) throw new Error(message);
      set((state) => ({
        reviews: state.reviews.filter((acc) => acc.id !== id)
      }));
      toast.success("Xoá thành công")
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      set({ loading: false });
    }
  }
}));
