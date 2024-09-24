// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   markfetchDone,
//   markfetchingDone,
//   markfetingStarted,
// } from "../../store/fetchStatusSlice";
// import { initRecipes } from "../../store/recipeSlice";
// import RecipeService from "../../services/RecipeService";

// function FetchRecipes({ pageNumber, pageSize, sortBy, sortDir }) {
//   const fetchStatus = useSelector((store) => store.fetchStatus);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchData = async () => {
//       if (fetchStatus.fetchDone) return;

//       dispatch(markfetingStarted());
//       const response = await RecipeService.getAllRecipes(
//         pageNumber,
//         pageSize,
//         sortBy,
//         sortDir
//       );
//       console.log(response);

//       dispatch(
//         initRecipes({
//           content: response.data.content,
//           totalPages: response.data.totalPages,
//           totalElements: response.data.totalElements,
//           pageNumber: response.data.pageNumber,
//           pageSize: response.data.pageSize,
//           lastPage: response.data.lastPage,
//         })
//       );
//       dispatch(markfetchingDone());
//       dispatch(markfetchDone());
//     };

//     fetchData();
//   }, [dispatch, fetchStatus, pageNumber, pageSize, sortBy, sortDir]);

//   return <></>;
// }

// export default FetchRecipes;
