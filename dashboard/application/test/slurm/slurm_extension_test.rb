require 'ood_core/job/adapters/slurm'
require 'securerandom'

class SlurmExtensionTest < ActiveSupport::TestCase

  def setup
    separator = "\x1F"
    @job_id = SecureRandom.uuid.to_s
    @expected_sacct_parameters = ["sacct", "-j", @job_id, "-P", "--delimiter", "\x1F", "-n", "--units", "M", "-o", "JobId,JobName,State,Reason,ReqMem,ReqCPUS,ReqNodes,Timelimit,ExitCode"]
    @mock_sacct_output =
"#{@job_id}#{separator}job-name#{separator}state#{separator}reason#{separator}500Mc#{separator}4#{separator}1#{separator}02:00:00#{separator}0:0
#{@job_id}.batch#{separator}job-name#{separator}#{separator}#{separator}#{separator}#{separator}#{separator}#{separator}"

  end

  test "should call sacct with expected parameters" do
    OodCore::Job::Adapters::Slurm::Batch.any_instance.stubs(:call).with() { |*args| args == @expected_sacct_parameters }.returns("")
    slurm = OodCore::Job::Factory.build_slurm({})
    slurm.completion_info(@job_id)
  end

  test "should parse sacct output" do
    OodCore::Job::Adapters::Slurm::Batch.any_instance.stubs(:call).returns(@mock_sacct_output)
    slurm = OodCore::Job::Factory.build_slurm({})
    result = slurm.completion_info(@job_id)
    assert_equal @job_id, result[:job_id]
    assert_equal "job-name", result[:job_name]
    assert_equal "state", result[:state]
    assert_equal "reason", result[:reason]
    assert_equal "500Mc", result[:memory]
    assert_equal "4", result[:cpu]
    assert_equal "1", result[:nodes]
    assert_equal 7200, result[:runtime]
    assert_equal "0:0", result[:exit_code]

    assert_equal 1, result[:tasks].length
    assert_equal "#{@job_id}.batch", result[:tasks][0][:job_id]
    assert_equal "job-name", result[:tasks][0][:job_name]
    assert_nil result[:tasks][0][:state]
    assert_nil result[:tasks][0][:reason]
    assert_nil result[:tasks][0][:memory]
    assert_nil result[:tasks][0][:cpu]
    assert_nil result[:tasks][0][:nodes]
    assert_nil result[:tasks][0][:runtime]
    assert_nil result[:tasks][0][:exit_code]
  end

end