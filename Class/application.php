<?php 
    class Application {
        private $id;                // STT
        private $name;              // Tên
        private $major;             // Ngành
        private $admissionBlock;    // Khối
        private $approver;          // Người duyệt
        private $status;            // Trạng thái

        // id
        public function getId(){
            return $this->id;
        }
        public function setId($id){
            $this->id = $id;
        }

        // name
        public function getName(){
            return $this->name;
        }
        public function setName($name){
            $this->name = $name;
        }

        // major
        public function getMajor(){
            return $this->major;
        }
        public function setMajor($major){
            $this->major = $major;
        }

        // admission block
        public function getAdmissionBlock(){
            return $this->admissionBlock;
        }
        public function setAdmissionBlock($admissionBlock){
            $this->admissionBlock = $admissionBlock;
        }

        // approver
        public function getApprover(){
            return $this->approver;
        }
        public function setApprover($approver){
            $this->approver = $approver;
        }

        //  status
        public function getStatus(){
            return $this->status;
        }
        public function setStatus($status){
            $this->status = $status;
        }

        public function __construct($id, $name, $major, $admissionBlock, $approver, $status){
            $this->setId($id);
            $this->setName($name);
            $this->setMajor($major);
            $this->setAdmissionBlock($admissionBlock);
            $this->setApprover($approver);
            $this->setStatus($status);
        }
    }
?>