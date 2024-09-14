import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../Style/Caremi.css';

// Register the necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const CarEmi = () => {
    const [principal, setPrincipal] = useState(950000); // Default value
    const [rate, setRate] = useState(8.1); // Default value
    const [term, setTerm] = useState(7); // Default value
    const [emi, setEmi] = useState(null);
    const [totalInterest, setTotalInterest] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [year, setYear] = useState(12)

    const emicalcultor = () => {
        const P = parseFloat(principal);
        const R = parseFloat(rate) / (12 * 100); // Monthly interest rate
        const N = parseInt(term) * year;

        if (P > 0 && R > 0 && N > 0) {
            const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
            const roundedEmi = Math.round(emi); // Round to nearest whole number
            setEmi(roundedEmi);

            // Calculate total interest and total payment
            const totalPayment = roundedEmi * N;
            const interest = totalPayment - P;
            setTotalInterest(interest.toFixed(2));
            setTotalPayment(totalPayment.toFixed(2));
        } else {
            setEmi(null);
            setTotalInterest(0);
            setTotalPayment(0);
        }
    };

    useEffect(() => {
        emicalcultor();
    }, [principal, rate, term, year]);

    const pieData = {
        labels: ['Principal Amount', 'Interest Amount '],
        datasets: [
            {
                data: [principal, totalInterest],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    return (
        <>
            <div className="containerheading" style={{ marginTop: '20px' }}>
                <div className="redbarheading"></div>
                <div className="nameheading">Car Emi Calculator</div>
            </div>
            <div className="emicontainer">
                <div className="principalamt">
                    <div className="emiuppercontainer">
                        <div className="redbaremi"></div>
                        <p>Principal Amount</p>
                    </div>
                    <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
                    <input type="range" value={principal} onChange={(e) => setPrincipal(e.target.value)} min={0} max={2000000} />
                    <div className="emirange">
                        <span>0</span>
                        <span>10L</span>
                        <span>20L</span>
                    </div>
                </div>
                <div className="rateamt">
                    <div className="emiuppercontainer">
                        <div className="redbaremi"></div>
                        <p>Rate</p>
                    </div>
                    <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
                    <input type="range" value={rate} onChange={(e) => setRate(e.target.value)} min={0} max={20} />
                    <div className="emirange">
                        <span>0%</span>
                        <span>5</span>
                        <span>10</span>
                        <span>15</span>
                        <span>20</span>
                    </div>
                </div>
                <div className="termamt">
                    <div className="emiuppercontainer">
                        <div className="redbaremi"></div>
                        <p>Term</p>
                    </div>
                    <div className="termalldetails">
                    <input type="number" value={term} onChange={(e) => setTerm(e.target.value)} />
                    <div className="Emi-Btns">
                    <button onClick={()=>setYear(1)} style={year===1?{backgroundColor:'rgb(249, 54, 54)'}:{}}>M</button>
                    <button onClick={()=>setYear(12)} style={year===12?{backgroundColor:'rgb(249, 54, 54)'}:{}}>Y</button>
                    </div>
                    </div>
                    <input type="range" value={term} onChange={(e) => setTerm(e.target.value)} min={0} max={year===1?84:7} />
                    {year===12?<div className="yearemirange">
                        <span>0</span>
                        <span style={{ marginLeft: '35px' }}>1</span>
                        <span style={{ marginLeft: '65px' }}>3</span>
                        <span style={{ marginLeft: '67px' }}>5</span>
                        <span style={{ marginLeft: '66px' }}>7</span>
                    </div>:<div className="yearemirange">
                        <span>0</span>
                        <span style={{ marginLeft: '32px' }}>12</span>
                        <span style={{ marginLeft: '23px' }}>24</span>
                        <span style={{ marginLeft: '23px' }}>36</span>
                        <span style={{ marginLeft: '23px' }}>48</span>
                        <span style={{ marginLeft: '23px' }}>60</span>
                        <span style={{ marginLeft: '23px' }}>72</span>
                        <span style={{ marginLeft: '22px' }}>84</span>
                    </div>}
                    
                </div>
            </div>
            <div className="emiresultcontainer">
                <div className="emiresultleft">
                    <div className="emiuppercontainer">
                        <div className="redbaremi"></div>
                        <p>Result :</p>
                    </div>
                    <div className="emiresult">
                        <h1>Loan Emi :</h1>
                        <h2>₹{emi}</h2>
                    </div>
                    <div className="interestresult">
                        <h1>Total Interest Payable :</h1>
                        <h2>₹{totalInterest}</h2>
                    </div>
                    <div className="paymentresult">
                        <h1>Total Payment :</h1>
                        <h2>₹{totalPayment}</h2>
                    </div>
                </div>
                <div className="piechart">
                    <h1>Loan Breakdown</h1>
                    <Pie data={pieData} />
                </div>
            </div>

        </>
    );
}

export default CarEmi;
