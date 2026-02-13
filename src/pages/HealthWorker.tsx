import Navbar from "@/components/Navbar";
import { patientRecords } from "@/data/dummy-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Plus, Upload, Wifi, WifiOff } from "lucide-react";
import { useState } from "react";

const HealthWorker = () => {
  const [isOnline] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold">Health Worker <span className="gradient-text">Panel</span></h1>
            <p className="text-muted-foreground mt-1">Report cases and manage field data</p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${isOnline ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
            {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            {isOnline ? "Online" : "Offline"}
          </div>
        </div>

        {/* Add Case Form */}
        <div className="glass-card p-6 mb-8">
          <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-primary" /> Report New Case
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label>Patient Name</Label>
              <Input placeholder="Enter patient name" className="mt-1" />
            </div>
            <div>
              <Label>Age</Label>
              <Input type="number" placeholder="Age" className="mt-1" />
            </div>
            <div>
              <Label>Village</Label>
              <Input placeholder="Village name" className="mt-1" />
            </div>
            <div>
              <Label>Disease</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select disease" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cholera">Cholera</SelectItem>
                  <SelectItem value="typhoid">Typhoid</SelectItem>
                  <SelectItem value="dysentery">Dysentery</SelectItem>
                  <SelectItem value="hepatitis">Hepatitis A</SelectItem>
                  <SelectItem value="diarrhea">Diarrhea</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Severity</Label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Severity" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">Mild</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="severe">Severe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="gap-2 w-full"><MapPin className="w-4 h-4" /> Capture GPS</Button>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Button className="gap-2"><Plus className="w-4 h-4" /> Submit Case</Button>
            <Button variant="outline" className="gap-2"><Upload className="w-4 h-4" /> Upload CSV</Button>
          </div>
        </div>

        {/* Patient Records */}
        <div className="glass-card p-6">
          <h3 className="font-heading font-semibold mb-4">Patient Records</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Age</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Village</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Disease</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {patientRecords.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs">{p.id}</td>
                    <td className="py-3 px-4 font-medium">{p.name}</td>
                    <td className="py-3 px-4">{p.age}</td>
                    <td className="py-3 px-4">{p.village}</td>
                    <td className="py-3 px-4">{p.disease}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.status === 'Active' ? 'risk-high' : 'risk-low'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{p.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthWorker;
