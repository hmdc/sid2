require 'test_helper'

class SlurmPartitionInfoTest < ActiveSupport::TestCase

  test "should return all partitions for group" do
    underTest = SlurmPartitionInfo.new("test/fixtures/slurm/slurm.conf")

    result = underTest.get_partitions "sid-group"
    assert_equal 2, result.length
    assert_equal true, result.include?("sid-partition1")
    assert_equal true, result.include?("sid-partition2")
  end

  test "should return all partitions for all group" do
    underTest = SlurmPartitionInfo.new("test/fixtures/slurm/slurm.conf")

    result = underTest.get_partitions ["sid-group", "other-lab"]
    assert_equal 3, result.length
    assert_equal true, result.include?("sid-partition1")
    assert_equal true, result.include?("sid-partition2")
    assert_equal true, result.include?("other-partition")
  end

  test "should return default partition for group not found" do
    underTest = SlurmPartitionInfo.new("test/fixtures/slurm/slurm.conf")

    result = underTest.get_partitions "sid-group-not-found"
    assert_equal 1, result.length
    assert_equal true, result.include?("sid-default")
  end

end