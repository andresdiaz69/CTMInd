# View: vw_Cobertura_inventarios

## Usa los objetos:
- [[Empresas]]
- [[vw_Inventario_RemisionesPendFacturar]]
- [[vw_inventario_Repuestos]]
- [[vw_Inventario_Traslados]]

```sql

--DROP VIEW [vw_Cobertura_inventarios] ejecutar primero
CREATE   VIEW [dbo].[vw_Cobertura_inventarios] AS
SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, NombreEmpresa, CodUnidadNegocio, NombreUnidadNegocio, IdCentros, NombreCentro, SUM(Valor)Valor
FROM 
(
	SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, b.NombreEmpresa, CodUnidadNegocio, NombreUnidadNegocio, IdCentros, NombreCentro, Valor = ValorStock
	FROM vw_inventario_Repuestos as a 
	INNER JOIN [DBMLC_0190].dbo.Empresas b on a.IdEmpresas = b.CodigoEmpresa

	UNION ALL

	SELECT Ano_Periodo, Mes_Periodo, IdEmpresas_Entrada, b.NombreEmpresa, CodUnidadNegocio, NombreUnidadNegocio, IdCentros, NombreCentro, Valor = valormediomovimiento
	FROM vw_Inventario_Traslados as a 
	INNER JOIN [DBMLC_0190].dbo.Empresas b on a.IdEmpresas_Entrada = b.CodigoEmpresa 

	UNION ALL 

	SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, Empresa,CodUnidadNegocio, NombreUnidadNegocio, IdCentros,  Centro,Valor = ValorMedioMovimiento 
	FROM vw_Inventario_RemisionesPendFacturar a 


 
) A
WHERE NombreUnidadNegocio not in ('NEBULA','Colision','Colisión','USC (Unidad de Servicios compartidos)','FOMENTA') 
--Ano_Periodo = 2024 AND Mes_Periodo = 4
--AND CodUnidadNegocio = 520
----AND IdEmpresas = 1
--and NombreCentro='JD-B/Quilla-Cl.110'
GROUP BY Ano_Periodo, Mes_Periodo, IdEmpresas, NombreEmpresa, CodUnidadNegocio, NombreUnidadNegocio, IdCentros, NombreCentro

```
