# View: vw_Act_SedeRepuestosyEC

## Usa los objetos:
- [[v_Act_centros_sincr_EstructuraCostos]]
- [[vw_Act_SedesRepuestos]]

```sql
--drop view vw_Act_SedeRepuestosyEC
CREATE VIEW [dbo].[vw_Act_SedeRepuestosyEC] AS
SELECT distinct
 	             SR.CodEmp2
                ,EC.Cod_empresa
				,EC.Nombre_Empresa
                ,SR.NombReducSedeRep         
				,SR.CodCentro2
				,SR.NombCentro2
				,EC.Cod_Centro
				,EC.NombCentro				
				,SR.CodSeccion2
				,SR.Seccion2
				,EC.Cod_seccion
				,EC.Nombre_Seccion
				,SR.CodiSedeRepuestos2
				,SR.NombreSedeRepuestos2
				,SR.CodDepartamento
FROM  vw_Act_SedesRepuestos SR
     ,v_Act_centros_sincr_EstructuraCostos EC 
WHERE SR.CodCentro2=EC.Cod_Centro 
and   SR.CodSeccion2=EC.Cod_seccion
and   SR.CodEmp2=EC.Cod_empresa

```
