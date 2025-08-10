import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { getDashboard } from '@/services/userService';
import Loading from '@/components/Loading';
import ErrorComponent from '@/components/ErrorComponent';
import { toast } from 'react-toastify';

const ProfileDashboard = () => {
  const [stats, setStats] = useState({});
  const [pieSeries, setPieSeries] = useState([]);
  const [ratingsStats, setRatingsStats] = useState({});
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await getDashboard();

        const fetchedStats = data.stats || {};
        setStats(fetchedStats);
        setBio(data.bio || '');
        setRatingsStats(data.ratingsStats || {});

        setPieSeries([
          { id: 0, value: fetchedStats.booksCompleted || 0, label: 'Completed' },
          { id: 1, value: fetchedStats.booksReading || 0, label: 'Reading' },
          { id: 2, value: fetchedStats.booksPlanned || 0, label: 'Plan to Read' },
        ]);
      } catch (err) {
        toast.error('Error fetching Profile');
        console.error(err);
        setError('Error fetching Profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorComponent error={error} />;

  return (
    <div className="p-6 space-y-6">
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-2">About Me</h2>
        <p className="text-sm text-muted-foreground">{bio}</p>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

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

        <div className="flex flex-col gap-6 lg:col-span-2">
          
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Reading Distribution</h3>
            <div className="w-full overflow-x-auto">
              <PieChart
                series={[{ data: pieSeries }]}
                width={Math.min(window.innerWidth - 64, 500)}
                height={350}
              />
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Ratings Distribution</h3>
            <BarChart
              xAxis={[{ data: ['N/A', '0', '1', '2', '3', '4', '5'], label: 'Rating' }]}
              series={[
                {
                  data: [
                    ratingsStats['N/A'] || 0,
                    ratingsStats['0'] || 0,
                    ratingsStats['1'] || 0,
                    ratingsStats['2'] || 0,
                    ratingsStats['3'] || 0,
                    ratingsStats['4'] || 0,
                    ratingsStats['5'] || 0,
                  ],
                  label: 'Number of Ratings',
                },
              ]}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
