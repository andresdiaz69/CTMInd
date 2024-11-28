# View: vw_GAC_Numero_Sedes

## Usa los objetos:
- [[Empresas]]
- [[UnidadDeNegocio]]

```sql
CREATE VIEW [dbo].[vw_GAC_Numero_Sedes] AS
SELECT Ano, Mes, CodEmpresa, CodUnidadNegocio, Empresa=NombreEmpresa, Linea=Lower(NombreUnidadNegocio), NumeroSedes=count(CodCentro)
FROM(
		 SELECT DISTINCT b.NombreEmpresa, Ano=year(GETDATE()), Mes=month(GETDATE()), a.NombreUnidadNegocio
						, a.CodCentro, a.CodEmpresa, a.CodUnidadNegocio
		 FROM UnidadDeNegocio a 
		 INNER JOIN Empresas b ON a.CodEmpresa=b.CodigoEmpresa
		 WHERE a.CodUnidadNegocio in (1,2,3,5,7,12,19,20,22,23,245,410,411,417,418,520)
		 AND a.CodEmpresa IN (1,5,6)
		 AND a.NombreCentro not like 'CO-%'
		 AND a.NombreSeccion not like '%Talle Coli%' 
		 AND a.NombreCentro not like '%Administrativo%' 
)a 
GROUP BY  NombreEmpresa, NombreUnidadNegocio , Ano, Mes, CodEmpresa, CodUnidadNegocio

```
