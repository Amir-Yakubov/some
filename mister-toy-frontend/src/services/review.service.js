import { httpService } from './http.service'
// import { storageService } from './async-storage.service'
import { userService } from './user.service'
// import { getActionRemoveReview, getActionAddReview } from '../store/review.actions'
// import { store } from '../store/store'
// import { showSuccessMsg } from '../services/event-bus.service'
import { toyService } from './toy.service'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from './socket.service'

// ;(() => {
//   socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
//     console.log('GOT from socket', review)
//     store.dispatch(getActionAddReview(review))
//   })
//   socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
//     showSuccessMsg(`New review about me ${review.txt}`)
//   })
// })()


export const reviewService = {
    add,
    query,
    remove,
    getReviewFilter,
    getEmptyReview
}


function getEmptyReview() {
    return {
        txt: '',
        toy: {
            aboutToyId: '',
            name: '',
            price: ''
        },
        user: {
            aboutUserId: '',
            nickname: ''
        }
    }
}



function query(filterBy) {
    console.log('walla nishlah', filterBy)
    var queryStr = (!filterBy) ? '' : `?content=${filterBy.txt}`
    return httpService.get(`review${queryStr}`)
    // return storageService.query('review')
}

async function remove(reviewId) {
    console.log('nishlah?',reviewId)
    await httpService.delete(`review/${reviewId}`)
    // await storageService.remove('review', reviewId)
}

async function add(review) {
    console.log('BEFORE HTTP', review)
    const addedReview = await httpService.post(`review`, review)
    // await userService.update(reviewToAdd.byUser)
    // const addedReview = await storageService.post('review', reviewToAdd)
    console.log('GOT BACK IN THE FRONT', addedReview)
    return addedReview
}

function getReviewFilter() {
    return { txt: '' }
}