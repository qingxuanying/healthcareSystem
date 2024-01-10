import 'whatwg-fetch';
// import {Notification} from 'rc-notification';
function Fetch(url, opt = {}) {
  opt.method = opt.method || 'GET';
  opt.headers = {
    'Content-Type': 'application/json',
  };
  if (opt.token) {
    opt.headers.token = opt.token;
  }

  opt.body = JSON.stringify(opt.data) || null;
  if (opt.formdata) {
    opt.body = opt.formdata;
  }

  return fetch(url, opt)
    .then(response => {
      if (response.ok) {
        return response.json().then(res => {
          return res;
        });
      } else {
        return response.json().then(res => {
          return new Promise((_, reject) => {
            console.log(res);
            reject(res);
          });
        });
      }
    })
    .catch(e => {
      // Notification.newInstance({}, notification => {
      //   notification.notice({
      //     content: `服务端错误：${e.message}`
      //   });
      // });
      // 切断下一个 then 调用
      throw e;
    });
}
let Service = {
  // p_login
  Login(patientname, password) {
    return Fetch('api/patient/patientlogin', {
      method: 'POST',
      data: {
        patientname: patientname,
        password: password
      }
    });
  },
  // p_register
  register(patient_certificates_no, patientname, password) {
    return Fetch('api/patient/register', {
      method: 'POST',
      data: {
        patient_certificates_no: patient_certificates_no,
        patientname: patientname,
        password: password
      }
    });
  },
  //管理员注册
  addA(adminname, adminpassword) {
    return Fetch('api/admin/add', {
      method: 'POST',
      data: {
        adminname: adminname,
        adminpassword: adminpassword
      }
    });
  },
  //管理员登录
  loginA(adminname, adminpassword) {
    return Fetch('api/admin/adminlogin', {
      method: 'POST',
      data: {
        adminname: adminname,
        adminpassword: adminpassword
      }
    })
  },
  getDoctors() {
    return Fetch('api/doctor/doctors', {
      method: 'GET',
    })
  },

  addDoctors(
    doctorpassword,
    doctorname,
    doctor_age,
    doctor_gender,
    doctortitle,
    deptid,
    doctorintroduction,
    doctorcertificates_no,
    doctorphone) {
    return Fetch('api/doctor/add', {
      method: 'POST',
      data: {
        doctorpassword: doctorpassword,
        doctorname: doctorname,
        doctor_age: doctor_age,
        doctorgender: doctor_gender,
        doctortitle: doctortitle,
        deptid: deptid,
        doctorintroduction: doctorintroduction,
        doctorcertificates_no: doctorcertificates_no,
        doctorphone: doctorphone
      }
    })
  },

  deleteDoctor(doctorId) {
    return Fetch('api/doctor/delete', {
      method: 'DELETE',
      data: {
        doctorid: doctorId
      }
    })
  },

  getDoctor(doctorid) {
    return Fetch('api/doctor/get', {
      method: 'POST',
      data: {
        doctorid: doctorid
      }
    })
  },
  getDoctoridByname(name){
    return Fetch('api/doctor/get/doctorName',{
      method:'POST',
      data:{
        doctorname:name
      }
    })
  },

  updateDoctor(
    doctorid,
    doctorname,
    doctor_age,
    doctor_gender,
    doctortitle,
    deptid,
    doctorintroduction,
    doctorcertificates_no,
    doctorphone) {
    return Fetch('api/doctor/update', {
      method: 'PUT',
      data: {
        doctorid: doctorid,
        doctorname: doctorname,
        doctor_age: doctor_age,
        doctor_gender: doctor_gender,
        doctortitle: doctortitle,
        deptid: deptid,
        doctorintroduction: doctorintroduction,
        doctorcertificates_no: doctorcertificates_no,
        doctorphone: doctorphone
      }
    })
  },

  getWards() {
    return Fetch('api/ward/wards', {
      method: 'GET',
    })
  },

  addWard(wardnumber,wardname,wardCapacity,deptid,description){
    return Fetch('api/ward/add', {
      method: 'POST',
      data:{
        wardnumber:wardnumber, //病房号
        wardname:wardname,//病房名
        wardCapacity:wardCapacity,//病房容量
        deptid:deptid,//科室号
        description:description//病房描述
      }
    })
  },

  addDept(deptid,deptname,dutydoctor){
    return Fetch('api/dept/add',{
      method: 'POST',
      data:{
        deptid:deptid,
        deptname:deptname,
        dutydoctor:dutydoctor
      }
    })
  },

  getAllDepts(){
    return Fetch('api/dept/depts',{
      method:'GET',

    })
  },
  getScheduleByDeptid(deptid){
    return Fetch('api/doctorSchedule/get/deptId',{
      method:'POST',
      data:{
        deptid:deptid
      }
    })
  },

  updateSchedule(doctorscheduleid,doctorid,deptid,doctorname,week){
    return Fetch('api/doctorSchedule/update',{
      method:'PUT',
      data:{
        doctorscheduleid:doctorscheduleid,
        state:1,
        doctorid:doctorid,
        date: new Date(),
        deptid:deptid,
        doctorname:doctorname,
        week:week
      }
    })
  },

  getBedsByWardId(wardid){
    return Fetch('api/bed/get/wardId',{
      method:'POST',
      data:{
        wardid:wardid
      }
    })
  },

  updateBed(wardid,bedid,patientid,patientname,patientstatus){
    return Fetch('api/bed/update',{
      method:'PUT',
      data:{
        wardid:wardid,
        bedid:bedid,
        patientid:patientid,
        patientname:patientname,
        patientstatus:patientstatus
      }
    })
  },

  addDrug(medicationid,medicationname,category,purchaseprice,sellingprice,manufacturer,inventory){
    return Fetch('api/Medication/add',{
      method:'POST',
      data:{
        medicationid:medicationid,
        medicationname:medicationname,
        category:category,
        purchaseprice:purchaseprice,
        sellingprice:sellingprice,
        manufacturer:manufacturer,
        inventory:inventory
      }
    })
  },

  getAllDrugs(){
    return Fetch('api/Medication/medications',{
      method:'GET',
    })
  },

  updateDrug(medicationid,medicationname,category,purchaseprice,sellingprice,manufacturer,inventory){
    return Fetch('api/Medication/update',{
      method:'PUT',
      data:{
        medicationid:medicationid,
        medicationname:medicationname,
        category:category,
        purchaseprice:purchaseprice,
        sellingprice:sellingprice,
        manufacturer:manufacturer,
        inventory:inventory
      }
    })
  },

  getDrugByid(medicationid){
    return Fetch('api/Medication/get',{
      method:'POST',
      data:{
        medicationid:medicationid,
      }
    })
  },

  getDoctorScheduleByDoctorId(doctorid){
    return Fetch('api/doctorSchedule/get/doctorId',{
      method:'POST',
      data:{
        doctorid:doctorid
      }
    })
  },

  doctorLogin(doctorname,doctorpassword){
    return Fetch('api/doctor/doctorLogin',{
      method:'POST',
      data:{
        doctorname:doctorname,
        doctorpassword:doctorpassword
      }
    })
  },

  getPatientByid(id){
    return Fetch('api/patient/get',{
      method:'POST',
      data:{
        patientid:id
      }
    })
  },

  getPhoto(id){
    return Fetch(`api/patient/getphoto?patientid=${id}`,{
      method:'GET'
    })
  },

  updatePatient(id,name,sex,phone,age){
    return Fetch('api/patient/update',{
      method:'PUT',
      data:{
        patientid:id,
        patientname:name,
        patientage:age,
        patientgender:sex,
        patientPhone:phone
      }
    })
  },

  addRegistration(doctorid,patientid,decrept,fee){
    return Fetch('api/registration/add',{
      method:'POST',
      data:{
        doctorid:doctorid,
        patientid:patientid,
        decrept:decrept,
        fee:fee
      }
    })
  },

  getRegistrationByDOctorid(doctorid){
    return Fetch(`api/registration/get/doctorId?doctorId=${doctorid}`,{
      method:'GET'
    })
  },

  updateMedicalRecord(registrationid,preliminaryDiagnosis,treatmentAdvice){
    return Fetch('api/medicalRecord/update',{
      method:'PUT',
      data:{
        registrationid:registrationid,
        preliminaryDiagnosis:preliminaryDiagnosis,
        treatmentAdvice:treatmentAdvice
      }
    })
  },

  getPrescriptionByRegistrationId(registrationId){
    return Fetch(`api/prescription/get/registrationId?registrationId=${registrationId}`,{
      method:'GET'
    })
  },

  getprescriptionMedication(prescriptionId){
    return Fetch(`api/prescriptionMedication/get/prescriptionId?prescriptionId=${prescriptionId}`,{
      method:'GET'
    })
  },

  //处方开药
  addPreM(prescriptionid,medicationname,number,frequency){
    return Fetch('api/prescriptionMedication/add',{
      method:'POST',
      data:{
        prescriptionid:prescriptionid,
        medicationname:medicationname,
        number:number,
        frequency:frequency
      }
    })
  },
  //撤回处方
  delPreM(pmid){
    return Fetch(`api/prescriptionMedication/delete?pMId=${pmid}`,{
      method:'DELETE'
    })
  },

  getMedicalRecordByRegistrationId(registrationId){
    return Fetch(`api/medicalRecord/get/registrationId?registrationId=${registrationId}`)
  },

  getRegistrationByPatientId(patientId){
    return Fetch(`api/registration/get/patientId?patientId=${patientId}`,{
      method:'GET'
    })
  },

  getDeptName(deptId){
    return Fetch(`api/dept/get?deptId=${deptId}`,{
      method:'GET'
    })
  }

};

export default Service;
