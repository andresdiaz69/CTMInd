# View: vw_GAC_Numero_Sedes_Presupuesto

## Usa los objetos:
- [[Empresas]]
- [[UnidadDeNegocio]]

```sql


CREATE VIEW [dbo].[vw_GAC_Numero_Sedes_Presupuesto] AS
--****************************
--Autor: Jhon Hernández
-- Date: 17/10/2024
--Descr: Create VW para proyecto presupuesto. Generera las sedes para el calculo GAC.
--Se replica de las vista de la base DBMLC_0190
--****************************


SELECT Ano, Mes, CodEmpresa, CodUnidadNegocio, Empresa=NombreEmpresa, Linea=Lower(NombreUnidadNegocio), NumeroSedes=count(CodCentro)
FROM(
		 SELECT DISTINCT b.NombreEmpresa, Ano=year(GETDATE()), Mes=month(GETDATE()), a.NombreUnidadNegocio
						, a.CodCentro, a.CodEmpresa, a.CodUnidadNegocio
		 FROM DBMLC_0190.dbo.UnidadDeNegocio a 
		 INNER JOIN DBMLC_0190.dbo.Empresas b ON a.CodEmpresa=b.CodigoEmpresa
		 WHERE a.CodUnidadNegocio in (1,2,3,5,7,12,19,20,22,23,245,410,411,417,418,520)
		 AND a.CodEmpresa IN (1,5,6)
		 AND a.NombreCentro not like 'CO-%'
		 AND a.NombreSeccion not like '%Talle Coli%' 
		 AND a.NombreCentro not like '%Administrativo%' 
)a 
GROUP BY  NombreEmpresa, NombreUnidadNegocio , Ano, Mes, CodEmpresa, CodUnidadNegocio

```
