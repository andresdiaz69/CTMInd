# View: vw_GAC_Cobertura_inventarios

## Usa los objetos:
- [[Empresas]]
- [[vw_Inventario_RemisionesPendFacturar]]
- [[vw_inventario_Repuestos]]
- [[vw_Inventario_Traslados]]
- [[vw_InventarioVN]]
- [[vw_InventarioVO]]

```sql

--DROP VIEW [vw_Cobertura_inventarios] ejecutar primero
Create   VIEW [dbo].[vw_GAC_Cobertura_inventarios] AS
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

	union all

	SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, Empresa,CodUnidadNegocio, NombreUnidadNegocio, IdCentros,  Centro,Valor  
	  FROM vw_InventarioVO

	union all

	SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, Empresa,CodUnidadNegocio, NombreUnidadNegocio, IdCentro,  Centro,Valor  
	  FROM vw_InventarioVN
 
) A
WHERE NombreUnidadNegocio not in ('NEBULA','Colision','Colisión','USC (Unidad de Servicios compartidos)','FOMENTA') 
--Ano_Periodo = 2024 AND Mes_Periodo = 4
--AND CodUnidadNegocio = 520
----AND IdEmpresas = 1
--and NombreCentro='JD-B/Quilla-Cl.110'
GROUP BY Ano_Periodo, Mes_Periodo, IdEmpresas, NombreEmpresa, CodUnidadNegocio, NombreUnidadNegocio, IdCentros, NombreCentro

```
