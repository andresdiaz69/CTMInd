# View: vw_Act_SedesRepuestos

## Usa los objetos:
- [[SedesRepuestos]]

```sql
--drop view vw_Act_SedesRepuestos
CREATE VIEW [dbo].[vw_Act_SedesRepuestos] AS
SELECT  CASE 
WHEN NombreSedeRepuestos  Like '%BTA%' THEN 'BOGOTÁ' 
WHEN NombreSedeRepuestos  Like '%Btá%' THEN 'BOGOTÁ' 
WHEN NombreSedeRepuestos  Like '%Bogot%' THEN 'BOGOTÁ'
WHEN NombreSedeRepuestos  Like '%Bon-%' THEN 'BOGOTÁ'
WHEN NombreSedeRepuestos  Like '%Centro Consignaciones%' THEN 'BOGOTÁ' 
WHEN NombreSedeRepuestos  Like '%Centro Digit%' THEN 'BOGOTÁ' 
WHEN NombreSedeRepuestos  Like '%B/manga%' THEN 'BUCARAMA'
WHEN NombreSedeRepuestos  Like '%B/Quilla%' THEN 'BARRANQU'
WHEN NombreSedeRepuestos  Like '%bellpi%' THEN 'BOGOTÁ'
WHEN NombreSedeRepuestos  Like '%IR-Administración Central%' THEN 'BOGOTÁ'  
WHEN NombreSedeRepuestos  Like '%Villavo%' THEN 'VILLAVIC'  
WHEN NombreSedeRepuestos  Like '%Cali-%' THEN 'CALI'  
WHEN NombreSedeRepuestos  Like '%Chía-%' THEN 'CHÍA'
WHEN NombreSedeRepuestos  Like '%Chia-%' THEN 'CHÍA'
WHEN NombreSedeRepuestos  Like '%Cota-%' THEN 'COTA'
WHEN NombreSedeRepuestos  Like '%Duitama-%' THEN 'DUITAMA'
WHEN NombreSedeRepuestos  Like '%Ibague%' THEN 'IBAGUÉ'
WHEN NombreSedeRepuestos  Like '%Itagui%' THEN 'ITAGUI'
WHEN NombreSedeRepuestos  Like '%Neiva-%' THEN 'NEIVA'
WHEN NombreSedeRepuestos  Like '%Pasoanch%' THEN 'CALI'
WHEN NombreSedeRepuestos  Like '%Pasoanch%' THEN 'CALI'
WHEN NombreSedeRepuestos  Like '%JD-Monteria-Via Cereté%' THEN 'MONTERÍA' 
WHEN NombreSedeRepuestos  Like '%Ruta 40%' THEN 'CALI'
WHEN NombreSedeRepuestos  Like '%Yopal-%' THEN 'YOPAL'
ELSE
RTRIM(LTRIM(UPPER(SUBSTRING(SUBSTRING(NombreSedeRepuestos,(CHARINDEX('-',NombreSedeRepuestos)+1),LEN(NombreSedeRepuestos)),1,8))))
END as  NombReducSedeRep
       ,CodigoEmpresa as CodEmp2
	   ,NombreEmpresa as NombEmpresa2
       ,CodigoSedeRepuestos as CodiSedeRepuestos2
	   ,NombreSedeRepuestos as NombreSedeRepuestos2
	   ,CodigoCentro as CodCentro2
	   ,NombreCentro as NombCentro2
	   ,CodigoSeccion as CodSeccion2
	   ,Seccion as seccion2
	   ,CodigoDepartamento  as CodDepartamento
FROM [DBMLC_0190].dbo.SedesRepuestos SR

```
