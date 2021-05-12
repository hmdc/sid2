#json.array! @sessions
json.array!(@sessions) do |s|
  json.connect s.connect if s.running? else { }
  json.title s.title
  json.job_id s.job_id
  json.view s.view
  json.status s.status
  json.info s.info
end
