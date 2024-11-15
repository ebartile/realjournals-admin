import { styled } from '@material-ui/core/styles';
import { StepConnector as BaseStepConnector } from '@material-ui/core';

const StepConnector = styled(BaseStepConnector)(({ theme }) => ({
  top: 10,
  left: 'calc(-50% + 20px)',
  right: 'calc(50% + 20px)',
  '&.Mui-active, &.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main
    }
  },
  '& .MuiStepConnector-line': {
    borderColor: theme.palette.divider,
    borderTopWidth: 2
  }
}));

export default StepConnector;
