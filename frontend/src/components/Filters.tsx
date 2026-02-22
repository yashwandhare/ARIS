import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterState } from '@/types';

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function Filters({ filters, onFilterChange }: FiltersProps) {
  const handleReset = () => {
    onFilterChange({
      search: '',
      score: 'all',
      role: 'all',
      date: 'all',
      status: 'all',
      confidence: 'all',
    });
  };

  return (
    <div className="flat-card p-4 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-charcoal-400" />
        <Input
          placeholder="Search by name..."
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
        <Select
          value={filters.score}
          onValueChange={(value) => onFilterChange({ ...filters, score: value as any })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Score" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Scores</SelectItem>
            <SelectItem value="high">High (80+)</SelectItem>
            <SelectItem value="medium">Medium (50-79)</SelectItem>
            <SelectItem value="low">Low (&lt;50)</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.role}
          onValueChange={(value) => onFilterChange({ ...filters, role: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Full Stack Developer">Full Stack</SelectItem>
            <SelectItem value="Backend Developer">Backend</SelectItem>
            <SelectItem value="Frontend Developer">Frontend</SelectItem>
            <SelectItem value="Mobile Developer">Mobile</SelectItem>
            <SelectItem value="DevOps Engineer">DevOps</SelectItem>
            <SelectItem value="Data Engineer">Data Engineer</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.date}
          onValueChange={(value) => onFilterChange({ ...filters, date: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(value) => onFilterChange({ ...filters, status: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_review">In Review</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.confidence}
          onValueChange={(value) => onFilterChange({ ...filters, confidence: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Confidence" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Confidence</SelectItem>
            <SelectItem value="High Potential">High Potential</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Risk">Risk</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={handleReset} className="gap-2">
          <X className="h-4 w-4" />
          Clear
        </Button>
      </div>
    </div>
  );
}
