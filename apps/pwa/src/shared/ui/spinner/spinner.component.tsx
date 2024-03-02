import { ClipLoader } from 'react-spinners';
import cls from './spinner.module.sass';

export const Spinner: React.FC = () => {
  return (
    <div className={cls.container}>
      <ClipLoader />
    </div>
  );
};
