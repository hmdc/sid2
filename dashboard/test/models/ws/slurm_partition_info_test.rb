require 'test_helper'

class Ws::SlurmPartitionInfoTest < ActiveSupport::TestCase

  test "should parse default partition" do
    underTest = Ws::SlurmPartitionInfo.new("test/fixtures/slurm/slurm.conf")

    result = underTest.get_default_partition
    assert_equal "sid-default", result
  end

  test "should return all partitions for group" do
    underTest = Ws::SlurmPartitionInfo.new("test/fixtures/slurm/slurm.conf")

    result = underTest.get_partitions "sid-group"
    assert_equal 2, result.length
    assert_equal true, result.include?("sid-partition1")
    assert_equal true, result.include?("sid-partition2")
  end

  test "should return all partitions for all group" do
    underTest = Ws::SlurmPartitionInfo.new("test/fixtures/slurm/slurm.conf")

    result = underTest.get_partitions ["sid-group", "other-lab"]
    assert_equal 3, result.length
    assert_equal true, result.include?("sid-partition1")
    assert_equal true, result.include?("sid-partition2")
    assert_equal true, result.include?("other-partition")
  end

  test "should return default partition for group not found" do
    underTest = Ws::SlurmPartitionInfo.new("test/fixtures/slurm/slurm.conf")

    result = underTest.get_partitions "sid-group-not-found"
    assert_equal 1, result.length
    assert_equal true, result.include?("sid-default")
  end

  test "should return default partition for nil group" do
    underTest = Ws::SlurmPartitionInfo.new("test/fixtures/slurm/slurm.conf")

    result = underTest.get_partitions nil
    assert_equal 1, result.length
    assert_equal true, result.include?("sid-default")
  end

  test "should not break for invalid file" do
    underTest = Ws::SlurmPartitionInfo.new("not/found/test.conf")
    assert_nil underTest.get_default_partition
    assert_equal 0, underTest.get_partitions("anything").length
  end

  test "should default slurm file path when created without parameters" do
    underTest = Ws::SlurmPartitionInfo.new
    assert_equal "/etc/slurm/slurm.conf", underTest.get_file_path
  end

  test "should default slurm file path when created witho nil" do
    underTest = Ws::SlurmPartitionInfo.new(nil)
    assert_equal "/etc/slurm/slurm.conf", underTest.get_file_path
  end

end