# Stored Procedure: sp_Incapacidades_EmpleadosNuevos

## Usa los objetos:
- [[Empresas]]
- [[gen_ccosto]]
- [[gen_ciudad]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_deptos]]
- [[gen_tipide]]
- [[Jerarquia_EmpleadosNoNomina_Info]]
- [[JerarquiaEmpleados]]
- [[MLC_suspension_contratos]]
- [[rhh_emplea]]
- [[rhh_tbfondos]]
- [[v_consulta_ultima_historia_laboral]]
- [[vw_empleados]]

```sql




CREATE PROCEDURE [dbo].[sp_Incapacidades_EmpleadosNuevos]  
   @fechaInicial datetime 
 , @fechaFinal datetime AS
BEGIN
	SET FMTONLY OFF
	SET DATEFORMAT DMY
	SELECT DISTINCT Nit_Cliente, Tipo_id, Numero_Id,  Nombre, Nombre_Unidad_Negocio, Nombre_Departamento_Spiga,
	Nombre_Centro, Nombre_Seccion
				  , Sueldo_Basico, Fecha_Ingreso, Sexo, 
				  Fecha_Nacimiento, Departamento, Ciudad_Labor, EPS, AFP, Cedula_Jefe, Nombre_Jefe, Correo_Jefe
	FROM(
		 SELECT Numero_Id=a.cod_emp, Tipo_id=d.des_tip, Sueldo_Basico=a.sal_bas, Fecha_Nacimiento=a.fec_nac, Ciudad_Labor=i.nom_ciu, Departamento=j.nom_dep
		 , Nombre=a.nom_emp+' '+a.ap1_emp+' '+a.ap2_emp, EPS=k.nom_fdo, AFP=l.nom_fdo, Cedula_Jefe=m.CC_Jefe1, Nombre_Centro=h.nom_cco, Nombre_Departamento_Spiga=g.nombre, Nit_Cliente=n.NITEmpresa 
		 , Nombre_Unidad_Negocio = replace(replace(replace(replace(replace(replace(e.nombre,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'') 
		 , Nombre_Seccion=replace(replace(replace(replace(replace(replace(f.nombre,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),'') 
		 , Sexo= CASE WHEN a.sex_emp=2 THEN 'M' WHEN a.sex_emp=1 THEN 'F' END, Fecha_Ingreso= a.fec_ing   
		 , Nombre_Jefe=CASE WHEN m.NombreJefe        IS NULL THEN o.Nombre           ELSE m.NombreJefe END
		 , Correo_Jefe=CASE WHEN m.Email_Corporativo IS NULL THEN O.EmailCorporativo ELSE m.Email_Corporativo END 
		 FROM [Novasoft_CT_MM].dbo.rhh_emplea a
		 JOIN [Novasoft_CT_MM].dbo.v_consulta_ultima_historia_laboral b ON b.cod_emp=a.cod_emp AND b.cod_cia = a.cod_cia
		 LEFT JOIN [Novasoft_CT_MM].dbo.MLC_suspension_contratos c ON c.cod_emp = a.cod_emp
		 LEFT JOIN [Novasoft_CT_MM].dbo.gen_tipide   d ON d.cod_tip = a.tip_ide
		 LEFT JOIN [Novasoft_CT_MM].dbo.gen_clasif3  e ON e.codigo=b.cod_cl3 AND b.cod_emp = a.cod_emp AND b.cod_cia = a.cod_cia
		 LEFT JOIN [Novasoft_CT_MM].dbo.gen_clasif1  f ON f.codigo=b.cod_cl1 AND b.cod_emp = a.cod_emp AND b.cod_cia = a.cod_cia
		 LEFT JOIN [Novasoft_CT_MM].dbo.gen_clasif2  g ON g.codigo=b.cod_cl2 AND b.cod_emp = a.cod_emp AND b.cod_cia = a.cod_cia
		 LEFT JOIN [Novasoft_CT_MM].dbo.gen_ccosto   h ON h.cod_cco = a.cod_cco
		 LEFT JOIN [Novasoft_CT_MM].dbo.gen_ciudad   i ON b.cod_pai=i.cod_pai AND b.cod_dep=i.cod_dep AND b.cod_ciu=i.cod_ciu
		 LEFT JOIN [Novasoft_CT_MM].dbo.gen_deptos   j ON b.cod_pai=j.cod_pai AND b.cod_dep=j.cod_dep	
		 LEFT JOIN [Novasoft_CT_MM].dbo.rhh_tbfondos k ON k.cod_fdo = a.ccf_emp
		 LEFT JOIN [Novasoft_CT_MM].dbo.rhh_tbfondos l ON l.cod_fdo = a.fdo_pen		
		 LEFT JOIN (SELECT DISTINCT a.Cedula, a.CC_Jefe1, NombreJefe=b.Nombres+' '+b.Apellido1+' '+b.Apellido2, b.Email_Corporativo
					FROM [DBMLC_0190].dbo.JerarquiaEmpleados a LEFT JOIN [PSCService_DB].dbo.vw_empleados b 
					ON convert(varchar,a.CC_Jefe1)=convert(varchar,b.Cedula)) m ON m.Cedula=a.cod_emp	  
		 LEFT JOIN [DBMLC_0190].dbo.Empresas n ON b.cod_cia=n.CodigoEmpresa
		 LEFT JOIN (SELECT a.Cedula, a.EmailCorporativo, Nombre=b.nom_emp+' '+b.ap1_emp+' '+b.ap2_emp 
					FROM [DBMLC_0190].dbo.Jerarquia_EmpleadosNoNomina_Info a
					LEFT JOIN [Novasoft_CT_MM].dbo.rhh_emplea b on a.Cedula=b.cod_emp ) o ON m.CC_Jefe1=o.Cedula
	 )a
	WHERE Fecha_Ingreso BETWEEN @fechaInicial AND @fechaFinal
END

```
