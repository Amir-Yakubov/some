import { utilService } from '../services/util.service.js'

export function UserActivities({ user }) {
  return (
    <section className='user-activities'>
      <ul className='activities-list'>
        <h3>Recent Activities</h3>
        {user.activities.length &&
          user.activities.map((activity) => {
            return (
              <li className={`activity ${activity.type}`} key={activity._id}>
                <span className='activity-txt line-clamp'>{activity.activity}</span>
                <span className='activity-time'>{utilService.formatTime(activity.createdAt)}</span>
              </li>
            )
          })}
      </ul>
    </section>
  )
}
