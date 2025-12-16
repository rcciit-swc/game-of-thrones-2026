import UserProfile from '@/components/TESTUserProfile';

const page = () => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Game of Thrones 2026</h1>
      <div className="space-y-6">
        <UserProfile />
      </div>
    </div>
  );
};

export default page;
