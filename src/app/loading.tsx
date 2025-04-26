
import LoadingState from '@/components/ui/common/LoadingState';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingState variant="spinner" />
    </div>
  );
}
