<?php
    class Major{
        private $name;                  // tên ngành
        private $admissionBlocks;       // khối xét tuyển
        private $submissionOpenDate;    // ngày bắt đầu nhận đơn
        private $submissionDeadline;    // ngày kết thúc nhận đơn

        // name
        public function getName(){
            return $this->name;
        }
        public function setName($name){
            $this->name = $name;
        }

        // addmission blocks (array)
        public function getAdmissionBlocks(){
            return $this->admissionBlocks;
        }
        public function setAdmissionBlocks($admissionBlocks){
            $this->admissionBlocks = $admissionBlocks;
        }

        // submission open date
        public function getSubmissionOpenDate(){
            return $this->submissionOpenDate;
        }
        public function setSubmissionOpenDate($submissionOpenDate){
            $this->submissionOpenDate = $submissionOpenDate;
        }

        // submission deadline
        public function getSubmissionDeadline(){
            return $this->submissionDeadline;
        }
        public function setSubmissionDeadline($submissionDeadline){
            $this->submissionDeadline = $submissionDeadline;
        }

        public function __construct($name, $admissionBlocks, $submissionOpenDate, $submissionDeadline)
        {
            $this->setName($name);
            $this->setAdmissionBlocks($admissionBlocks);
            $this->setSubmissionOpenDate($submissionOpenDate);
            $this->setSubmissionDeadline($submissionDeadline);
        }
    }
?>