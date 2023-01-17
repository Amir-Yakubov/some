import { reviewService } from '../services/review.service'
import { store } from '../store/store.js'

// Action Creators
export function getActionRemoveReview(reviewId) {
  return { type: 'REMOVE_REVIEW', reviewId }
}
export function getActionAddReview(review) {
  return { type: 'ADD_REVIEW', review }
}
export function getActionSetWatchedUser(user) {
  return { type: 'SET_WATCHED_USER', user }
}

export async function loadReviews(filterBy) {
  try {
    console.log('YOTZA LEAKIFA', filterBy)
    const reviews = await reviewService.query(filterBy)
    store.dispatch({ type: 'SET_REVIEWS', reviews })

  } catch (err) {
    console.log('ReviewActions: err in loadReviews', err)
    throw err
  }
}

export async function addReview(review) {
  try {
    const addedReview = await reviewService.add(review)
    console.log('GAM LEPO EGATI', review)
    store.dispatch(getActionAddReview(addedReview))
    // const { score } = addedReview.byUser
    // store.dispatch({ type: 'SET_SCORE', score })
    // return review
  } catch (err) {
    console.log('ReviewActions: err in addReview', err)
    throw err
  }
}

export async function removeReview(reviewId) {
  try {
    await reviewService.remove(reviewId)
    store.dispatch(getActionRemoveReview(reviewId))
  } catch (err) {
    console.log('ReviewActions: err in removeReview', err)
    throw err
  }
}