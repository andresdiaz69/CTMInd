# View: vw_Seedz_Sellers

## Usa los objetos:
- [[EmpleadosActivos]]

```sql
CREATE VIEW [dbo].[vw_Seedz_Sellers] AS
SELECT Num=ROW_NUMBER() over(order by cnpjOrigemDados  asc),
Id, cnpjOrigemDados, dataCadastro, dataAtualizacao, documento, razaoSocial, email, regiaoAtendimento 
FROM(
	 SELECT DISTINCT Id=CodigoEmpleado, documento=CodigoEmpleado, 
	 
	 --JCS:2024|08|30 - AJUSTE FORMATO FECHAS
	 --dataCadastro=FORMAT(Fecha_Ingreso, 'yyyy-MM-dd hh:mm:ss'), 
	 --dataAtualizacao=FORMAT(Fecha_Ingreso, 'yyyy-MM-dd hh:mm:ss'), 
	 dataCadastro=Fecha_Ingreso, 
	 dataAtualizacao=Fecha_Ingreso, 
	 
	 codigo_centro, nombre_centro, regiaoAtendimento=Nombre_Ciudad_trabajo, 
	 razaoSocial, Nombre_Cargo, cnpjOrigemDados='830004993-8', 
	 email=CASE WHEN Email_Corporativo IS NULL OR Email_Corporativo='' THEN email2 ELSE Email_Corporativo END	 
	 FROM(
		  SELECT orden=row_number() over (partition by CodigoEmpleado order by (ano_periodo+Mes_Periodo) desc), Ano_Periodo,Mes_Periodo,
		  CodigoEmpleado, Fecha_Ingreso, codigo_centro, nombre_centro, Nombre_Ciudad_trabajo,
		  razaoSocial=Nombres+' '+Apellido1+' '+Apellido2, Email_Corporativo, Nombre_Cargo, email2=email
		  FROM EmpleadosActivos
		 WHERE nombre_centro like 'JD%'
		 --AND (( Nombre_Cargo LIKE 'Vend%' OR ( Nombre_Cargo  like '%asesor%' AND Nombre_Cargo LIKE '%servicio%')))
   )b WHERE orden=1
 )a 

```
