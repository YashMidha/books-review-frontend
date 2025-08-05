import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart } from '@mui/x-charts/PieChart';
import userData from '@/assets/user';

const ProfileDashboard = () => {
  const [stats, setStats] = useState({});
  const [pieSeries, setPieSeries] = useState([]);
  const [bio, setBio] = useState('');

  useEffect(() => {
    const fetchedStats = userData.stats;

    setStats(fetchedStats);
    setBio(userData.bio);

    setPieSeries([
      { id: 0, value: fetchedStats.booksCompleted, label: 'Completed' },
      { id: 1, value: fetchedStats.booksReading, label: 'Reading' },
      { id: 2, value: fetchedStats.booksPlanned, label: 'Plan to Read' },
    ]);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* User Bio Section */}
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-2">About Me</h2>
        <p className="text-sm text-muted-foreground">{bio}</p>
      </Card>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats Column */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          {Object.entries(stats).map(([key, value]) => (
            <Card key={key} className="shadow-sm">
              <CardContent className="p-4">
                <h3 className="text-md text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </h3>
                <p className="text-2xl font-bold text-primary">{value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Reading Distribution</h3>
            <div className="w-full overflow-x-auto">
              <PieChart
                series={[{ data: pieSeries }]}
                width={Math.min(window.innerWidth - 64, 500)}
                height={350}
              />
            </div>
          </Card>

          <Card className="p-6 flex items-center justify-center h-66 mb-10">
            <p className="text-muted-foreground text-lg italic">More stats coming soon...</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
