from datetime import timedelta

# Time intervals given in (start_time - end_time) format
time_intervals = [
   ("0:00","3:10"),
   ("0:00","1:35"),
   ("0:00","3:25"),
]

# Function to compute total duration
def compute_total_duration(time_intervals):
    total_duration = timedelta()
    for start, end in time_intervals:
        start_hours, start_minutes = map(int, start.split(":"))
        end_hours, end_minutes = map(int, end.split(":"))
        
        # Convert start and end times to timedelta
        start_time = timedelta(hours=start_hours, minutes=start_minutes)
        end_time = timedelta(hours=end_hours, minutes=end_minutes)

        # Adjust for times crossing the 12-hour mark
        if end_time < start_time:
            end_time += timedelta(hours=12)
            
        # Calculate duration and add to total
        duration = end_time - start_time
        total_duration += duration

    return total_duration

# Compute total duration
total_duration = compute_total_duration(time_intervals)
print("Total Duration:", total_duration)
