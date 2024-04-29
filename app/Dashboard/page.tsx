"use client";

import NavBarDashboard from "./NavBarDashboard/navbar";
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const DashboardPage = () => {
    const dataDoughnut = {
        labels: ['Disponible', 'Indisponible'],
        datasets: [
            {
                data: [44, 56],
                backgroundColor: ['#10b981', '#3b82f6'],
                borderColor: ['#047857', '#1e40af'],
                borderWidth: 1,
            },
        ],
    };

    const dataBar = {
        labels: ['Janvier', 'Février', 'Mars', 'Avril'],
        datasets: [
            {
                label: 'Réservations par mois',
                data: [65, 59, 80, 81],
                backgroundColor: ['#6366f1', '#ec4899', '#fbbf24', '#84cc16'],
                borderColor: ['#4f46e5', '#db2777', '#f59e0b', '#65a30d'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <NavBarDashboard/>
            <br />
            <br />
            <div className="p-4 md:p-10">
                <h2 className="text-2xl font-bold text-center mb-10">Dashboard</h2><br /><br />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="card bg-base-100 shadow-xl p-4">
                        <h3 className="text-lg font-semibold">Statut des véhicules</h3>
                        <div className="w-96 h-96" style={{ height: '400px' }}>
                            <Doughnut data={dataDoughnut} options={{ maintainAspectRatio: true }} />
                        </div>
                    </div>
                    <div className="card bg-base-100 shadow-xl p-4">
                        <h3 className="text-lg font-semibold">Réservations par mois</h3>
                        <div className="w-full" style={{ height: '400px' }}>
                            <Bar data={dataBar} options={{ maintainAspectRatio: true }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardPage;
