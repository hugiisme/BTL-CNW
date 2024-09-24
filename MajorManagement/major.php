<?php
    class Major{
        private $majorId;
        private $majorName;
        private $description;
        private $startDate;
        private $endDate;

        public function getMajorId(){
            return $this->majorId;
        }
        public function setMajorId($majorId){
            $this->majorId = $majorId;
        }

        public function getMajorName(){
            return $this->majorName;
        }
        public function setMajorName($majorName){
            $this->majorName = $majorName;
        }

        public function getDescription(){
            return $this->description;
        }
        public function setDescription($description){
            $this->description = $description;
        }

        public function getStartDate(){
            return $this->startDate;
        }
        public function setStartDate($startDate){
            $this->startDate = $startDate;
        }
        
        public function getEndDate(){
            return $this->endDate;
        }
        public function setEndDate($endDate){
            $this->endDate = $endDate;
        }

        public function __construct($majorId, $majorName, $description, $startDate, $endDate){
           $this->setMajorId($majorId);
           $this->setMajorName($majorName);
           $this->setDescription($description);
           $this->setStartDate($startDate);
           $this->setEndDate($endDate);
        }
    }
?>