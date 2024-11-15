import SystemStatus from 'components/SystemStatus';
import RegistrationChart from 'components/RegistrationChart';
import LatestUsers from 'components/LatestUsers';
import EarningSummary from 'components/EarningSummary';

export default [
  {
    name: 'earning_summary',
    dimensions: EarningSummary.dimensions,
    component: EarningSummary
  },
  {
    name: 'system_status',
    dimensions: SystemStatus.dimensions,
    component: SystemStatus
  },
  {
    name: 'latest_users',
    dimensions: LatestUsers.dimensions,
    component: LatestUsers
  },
  {
    name: 'registration_chart',
    dimensions: RegistrationChart.dimensions,
    component: RegistrationChart
  }
];
