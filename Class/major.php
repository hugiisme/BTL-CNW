<?php
    class Major{
        private $name;                  // tên ngành
        private $admissionBlocks;       // khối xét tuyển
        private $submissionOpenDate;    // ngày bắt đầu nhận đơn
        private $submissionDeadline;    // ngày kết thúc nhận đơn
        private $available;             // trạng thái có thể nộp hồ sơ hay không

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

        // is available
        public function getAvailable(){
            return $this->available;
        }
        public function setAvailable($available){
            $this->available = $available;
        }
    }
?>