require 'ood_core/job/adapters/slurm'


module OodCore
  module Job
    module Adapters
      class Slurm
        class Batch
          def sacct_fields
            {
              job_id: "JobId",
              job_name: "JobName",
              state: "State",
              reason: "Reason",
              memory: "ReqMem",
              cpu: "ReqCPUS",
              nodes: "ReqNodes",
              runtime: "Timelimit",
              exit_code: "ExitCode",
            }
          end

          def call_sacct(job_id)
            #https://slurm.schedmd.com/sacct.html
            fields = sacct_fields
            args  = ["-j", job_id]
            args.concat ["-P"]#OUTPUT WILL BE DELIMITED
            args.concat ["--delimiter", UNIT_SEPARATOR]
            args.concat ["-n"]#NO HEADER
            args.concat ["--units", "M"]#MEMOTY UNITS IN MEGABYTES
            args.concat ["-o", fields.values.join(",")]

            jobs = []
            StringIO.open(call("sacct", *args)) do |output|
              output.each_line do |line|
                #REPLACE BLANKS WITH NIL
                values = line.strip.split(UNIT_SEPARATOR).map{ |value| value.blank? ? nil : value }
                jobs << Hash[fields.keys.zip(values)] unless values.empty?
              end
            end
            return jobs
          end
        end

        def consolidate_sacct_output(job_id, jobs)
          return jobs.first unless jobs.length > 1

          job_hash = {:tasks => []}

          jobs.map do |jobs_info|
            jobs_info[:runtime] = duration_in_seconds(jobs_info[:runtime]) if jobs_info[:runtime]
            job_hash[:tasks] << jobs_info if jobs_info[:job_id] != job_id

            if jobs_info[:job_id] == job_id
              job_hash.merge!(jobs_info)
            end
          end

          return job_hash
        end

        def completion_info(id)
          jobs = @slurm.call_sacct(id)
          consolidate_sacct_output(id, jobs)
        end

      end
    end
  end
end