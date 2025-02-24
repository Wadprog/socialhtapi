import { usePost, useDelete, useUpdate, useLoadMore } from "../../lib/react-query";

export const useGetReaction = (queryKey, enabled = false, entityType, entityId) =>
  useLoadMore(queryKey, enabled, `/reactions?entityType=${entityType}&entityId=${entityId}`);

export const useCreateReaction = (queryKey, oldData, newData, dataObj) => usePost(queryKey, `/reactions`, dataObj, (oldData, newData));

export const useDeleteReaction = (queryKey, oldData, newData) => useDelete(queryKey, `/reactions`, (oldData, newData));

export const useUpdateReaction = (queryKey, oldData, newData, dataObj) => useUpdate(queryKey, `/reactions`, dataObj, oldData, newData);
