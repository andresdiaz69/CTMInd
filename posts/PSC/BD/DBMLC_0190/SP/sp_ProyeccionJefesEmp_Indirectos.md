# Stored Procedure: sp_ProyeccionJefesEmp_Indirectos

## Usa los objetos:
- [[JerarquiaEmpleados]]

```sql


CREATE PROCEDURE [dbo].[sp_ProyeccionJefesEmp_Indirectos]
@Id_Jefe BIGINT
AS
BEGIN 
select J1.CEDULA,	J1.Nombre,	J1.CC_Jefe1,
	   j2.Nombre Nombre_1,	j2.CC_Jefe1 CCJefe1_1,
	   j3.Nombre Nombre_2,	j3.CC_Jefe1 CCJefe2_2,
	   j4.Nombre Nombre_3,	j4.CC_Jefe1 CCJefe3_3,
	   j5.Nombre Nombre_4,	j5.CC_Jefe1 CCJefe4_4,
	   j6.Nombre Nombre_5,	J6.CC_Jefe1 CCJefe5_5
from		JerarquiaEmpleados	J1
left join	JerarquiaEmpleados	J2	on j1.CC_Jefe1 = J2.Cedula
left join	JerarquiaEmpleados	J3	on j2.CC_Jefe1 = J3.Cedula
left join	JerarquiaEmpleados	J4	on J3.CC_Jefe1 = J4.Cedula
left join	JerarquiaEmpleados	J5	on J4.CC_Jefe1 = J5.Cedula
left join	JerarquiaEmpleados	J6	on J5.CC_Jefe1 = J6.Cedula
where J1.CC_Jefe2 = @Id_Jefe 
   or J1.CC_Jefe3 = @Id_Jefe 
   or J1.CC_Jefe4 = @Id_Jefe
order by 2
END

```
