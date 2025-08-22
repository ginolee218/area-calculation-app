import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const statutoryParkingPings = 36.3;

  const [inputs, setInputs] = useState({
    landArea: 4297,
    rightsScope: 0.0052,
    farIncentive: 2.25,
    incentiveFloorArea: 2,
    salesPingCoefficient: 1.6,
    landownerShare: 0.5,
    commonAreaRatio: 0.33,
  });

  const [results, setResults] = useState({
    basePing: 0,
    totalRightsValue: 0,
    indoorPingArea: 0,
    parkingPingArea: 0,
  });

  useEffect(() => {
    const basePing = inputs.landArea * inputs.rightsScope * 0.3025;
    const totalRightsValue = basePing * inputs.farIncentive * inputs.incentiveFloorArea * inputs.salesPingCoefficient * inputs.landownerShare;
    const indoorPingArea = totalRightsValue * (1 - inputs.commonAreaRatio);
    const parkingPingArea = totalRightsValue / statutoryParkingPings;

    setResults({
      basePing: basePing,
      totalRightsValue: totalRightsValue,
      indoorPingArea: indoorPingArea,
      parkingPingArea: parkingPingArea,
    });
  }, [inputs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  const renderInputField = (label, name, value, labelClassName = "") => (
    <div className="col-md-6 mb-3">
      <label className={`form-label ${labelClassName}`}>{label}</label>
      <input
        type="number"
        className="form-control"
        name={name}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );

  const renderConstantField = (label, value) => (
    <div className="col-md-6 mb-3">
      <label className="form-label">{label}</label>
      <input
        type="number"
        className="form-control"
        value={value}
        disabled
      />
    </div>
  );

  const renderResult = (label, value) => (
     <div className="col-sm-6 mb-3">
        <div className="card h-100">
            <div className="card-body text-center">
                <h6 className="card-title">{label}</h6>
                <p className="result-display">{value.toLocaleString('en-US', { maximumFractionDigits: 7 })}</p>
            </div>
        </div>
     </div>
  );

  return (
    <div className="calculator-container">
      <h1>不動產價值計算機</h1>

      <div className="card">
        <div className="card-header">主要參數</div>
        <div className="card-body">
          <div className="row">
            {renderInputField("土地面積 (平方公尺)", "landArea", inputs.landArea, "label-highlight")}
            {renderInputField("權利範圍", "rightsScope", inputs.rightsScope, "label-highlight")}
            {renderInputField("住三容積獎勵", "farIncentive", inputs.farIncentive)}
            {renderInputField("獎勵容積", "incentiveFloorArea", inputs.incentiveFloorArea)}
            {renderInputField("銷坪係數", "salesPingCoefficient", inputs.salesPingCoefficient)}
            {renderInputField("地主回分", "landownerShare", inputs.landownerShare)}
            {renderInputField("公設比", "commonAreaRatio", inputs.commonAreaRatio)}
            {renderConstantField("法定車位/坪數", statutoryParkingPings)}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h2>計算結果</h2>
        <div className="row mt-3">
            {renderResult("土地坪數", results.basePing)}
            {renderResult("權狀 (總坪數)", results.totalRightsValue)}
            {renderResult("室內坪數", results.indoorPingArea)}
            {renderResult("車位坪數", results.parkingPingArea)}
        </div>
      </div>
    </div>
  );
}

export default App;