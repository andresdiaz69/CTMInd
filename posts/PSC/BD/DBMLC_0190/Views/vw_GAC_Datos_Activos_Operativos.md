# View: vw_GAC_Datos_Activos_Operativos

## Usa los objetos:
- [[vw_GAC_Activos_Fijos]]
- [[vw_GAC_Cartera]]
- [[vw_GAC_Cobertura_inventarios]]

```sql

CREATE view [dbo].[vw_GAC_Datos_Activos_Operativos]

as

SELECT a.IdEmpresas, a.Ano_Periodo, case when Mes_Periodo In (1,2,3)    then '1(ene-mar)'
	                                     when Mes_Periodo In (4,5,6)    then '2(abr-jun)'
	                                     when Mes_Periodo In (7,8,9)    then '3(jul-sep)'
	                                     when Mes_Periodo In (10,11,12) then '4(oct-dic)' 
		                                 else 'NA' end trimestre, a.NombreCentro, a.CodUnidadNegocio, a.NombreUnidadNegocio, a.Valor,tipo='Activos_Fijos'
  FROM [DBMLC_0190].dbo.vw_GAC_Activos_Fijos a
 UNION ALL	 
SELECT b.IdEmpresas, b.Ano_Periodo, case when Mes_Periodo In (1,2,3)    then '1(ene-mar)'
	                                     when Mes_Periodo In (4,5,6)    then '2(abr-jun)'
	                                     when Mes_Periodo In (7,8,9)    then '3(jul-sep)'
	                                     when Mes_Periodo In (10,11,12) then '4(oct-dic)' 
		                                 else 'NA' end trimestre, b.NombreCentro, b.CodUnidadNegocio, b.NombreUnidadNegocio, b.Valor,tipo='Cartera'
  FROM [DBMLC_0190].dbo.vw_GAC_Cartera b
 UNION ALL
SELECT c.IdEmpresas, c.Ano_Periodo, case when Mes_Periodo In (1,2,3)    then '1(ene-mar)'
	                                     when Mes_Periodo In (4,5,6)    then '2(abr-jun)'
	                                     when Mes_Periodo In (7,8,9)    then '3(jul-sep)'
	                                     when Mes_Periodo In (10,11,12) then '4(oct-dic)' 
		                                 else 'NA' end trimestre, c.NombreCentro, c.CodUnidadNegocio, c.NombreUnidadNegocio, c.Valor,tipo='Inventario'
 FROM [DBMLC_0190].dbo.vw_GAC_Cobertura_inventarios c
where IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)

```
