# View: vw_spigaValorFacturasProveedores

## Usa los objetos:
- [[spiga_ImpuestosImportes]]

```sql
CREATE VIEW [dbo].[vw_spigaValorFacturasProveedores] AS 
select Ano_Periodo,Mes_Periodo,IdEmpresas,IdTerceros,NifCif,NombreTercero,Serie,NumFactura,ValorBase=sum(ValorBase),IVA=sum(iva),ValorTotal=sum(ValorTotal),NombreEmpresa
from(
		SELECT Ano_Periodo,								   Mes_periodo, 
			   IdEmpresas,								   IdTerceros, 
			   NifCif= SUBSTRING(NifCif,1,9),              NombreTercero = NombreTercero +' '+isnull(Apellido1,' ') + ' ' +ISNULL(Apellido2, ''),			
			   Serie= replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(Serie ,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),char(45),''),char(46), ''),char(42),''), char(43), ''), char(35), ''), char(44), ''), char(09), ''), ('|'), ''),				
			   NumFactura = replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(NumFactura ,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),char(45),''), char(46),''), char(42),''), char(43), ''), char(35), ''), char(44), ''), char(09),''), '|', ''),  
			   sum(ImporteBI) ValorBase, sum(Cuota) IVA, 
			   ValorTotal = sum(ImporteBI + Cuota),

			   CASE WHEN IdEmpresas = 1 THEN 'CasaToro' 
					WHEN IdEmpresas = 6 THEN 'Motorysa' 
					WHEN IdEmpresas = 5 THEN 'Bonaparte'
					WHEN IdEmpresas = 22 THEN 'Fomenta' 
					WHEN IdEmpresas = 24 THEN 'Bellpi SAS' 
					ELSE '' END NombreEmpresa

		  FROM [PSCService_DB].[dbo].spiga_ImpuestosImportes
		 WHERE IdImpuestoTipos =1
		 and    IdFacturaTipos = 'R'
		 --and serie like '%FE%'
		 --and NumFactura LIKE '%14436%'
		 --and IdTerceros = '18351'
		   --and Ano_Periodo = 2024
		 GROUP BY Ano_Periodo,		Mes_Periodo,	IdEmpresas,		IdTerceros,		NifCif, NombreTercero,	Apellido1,		Apellido2,		Serie,			NumFactura

		UNION ALL

		SELECT Ano_Periodo,								   Mes_periodo, 
		IdEmpresas,								   IdTerceros, 
		NifCif= SUBSTRING(NifCif,1,9),              NombreTercero = NombreTercero +' '+isnull(Apellido1,' ') + ' ' +ISNULL(Apellido2, ''),			
		Serie= replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(Serie ,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),char(45),''),char(46), ''),char(42),''), char(43), ''), char(35), ''), char(44), ''), char(09), ''), ('|'), ''),				
		NumFactura = replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(NumFactura ,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),char(45),''), char(46),''), char(42),''), char(43), ''), char(35), ''), char(44), ''), char(09),''), '|', ''),  
		sum(ImporteBE) ValorBase, sum(isnull(Cuota,0)) IVA, 
		ValorTotal = sum(ImporteBE + isnull(Cuota,0)),
		CASE WHEN IdEmpresas = 1 THEN 'CasaToro' 
		WHEN IdEmpresas = 6 THEN 'Motorysa' 
		WHEN IdEmpresas = 5 THEN 'Bonaparte'
		WHEN IdEmpresas = 22 THEN 'Fomenta' 
		WHEN IdEmpresas = 24 THEN 'Bellpi SAS' 
		ELSE '' END NombreEmpresa
		FROM [PSCService_DB].[dbo].spiga_ImpuestosImportes
		WHERE IdImpuestoTipos is NULL
		and ImporteBI = 0
		and ImporteBE <> 0
		and IdFacturaTipos = 'R'
		--and serie like '%FE%'
		--and NumFactura LIKE '%14436%'
		--and IdTerceros = '18351'
		--and Ano_Periodo = 2024
		GROUP BY Ano_Periodo,		Mes_Periodo,	IdEmpresas,		IdTerceros,		NifCif, NombreTercero,	Apellido1,		Apellido2,		Serie,			NumFactura

		UNION ALL

		SELECT Ano_Periodo,								   Mes_periodo, 
		IdEmpresas,								   IdTerceros, 
		NifCif= SUBSTRING(NifCif,1,9),              NombreTercero = NombreTercero +' '+isnull(Apellido1,' ') + ' ' +ISNULL(Apellido2, ''),			
		Serie= replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(Serie ,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),char(45),''),char(46), ''),char(42),''), char(43), ''), char(35), ''), char(44), ''), char(09), ''), ('|'), ''),				
		NumFactura = replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(NumFactura ,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),char(45),''), char(46),''), char(42),''), char(43), ''), char(35), ''), char(44), ''), char(09),''), '|', ''),  
		sum(ImporteBE) ValorBase, sum(isnull(Cuota,0)) IVA, 
		ValorTotal = sum(ImporteBNS + isnull(Cuota,0)),
		CASE WHEN IdEmpresas = 1 THEN 'CasaToro' 
		WHEN IdEmpresas = 6 THEN 'Motorysa' 
		WHEN IdEmpresas = 5 THEN 'Bonaparte'
		WHEN IdEmpresas = 22 THEN 'Fomenta' 
		WHEN IdEmpresas = 24 THEN 'Bellpi SAS' 
		ELSE '' END NombreEmpresa
		FROM [PSCService_DB].[dbo].spiga_ImpuestosImportes
		WHERE IdImpuestoTipos is NULL
		and ImporteBI = 0
		and ImporteBNS <> 0
		and IdFacturaTipos = 'R'
		--and serie like '%BPJP%'
		--and NumFactura LIKE '%117823%'
		--and IdTerceros = '19281'
		--and Ano_Periodo = 2024
		GROUP BY Ano_Periodo,		Mes_Periodo,	IdEmpresas,		IdTerceros,		NifCif, NombreTercero,	Apellido1,		Apellido2,		Serie,			NumFactura

		UNION ALL

		SELECT Ano_Periodo,								   Mes_periodo, 
			   IdEmpresas,								   IdTerceros, 
			   NifCif= SUBSTRING(NifCif,1,9),              NombreTercero = NombreTercero +' '+isnull(Apellido1,' ') + ' ' +ISNULL(Apellido2, ''),			
			   Serie= replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(Serie ,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),char(45),''),char(46), ''),char(42),''), char(43), ''), char(35), ''), char(44), ''), char(09), ''), ('|'), ''),				
			   NumFactura = replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(NumFactura ,char(13)+char(10)+'-',''),char(09),''),char(10),''),char(13),''),char(34),''),char(248),''),char(45),''), char(46),''), char(42),''), char(43), ''), char(35), ''), char(44), ''), char(09),''), '|', ''),  
			   ValorBase=0, IVA=0, 
			   ValorTotal= sum(Cuota),

			   CASE WHEN IdEmpresas = 1 THEN 'CasaToro' 
					WHEN IdEmpresas = 6 THEN 'Motorysa' 
					WHEN IdEmpresas = 5 THEN 'Bonaparte'
					WHEN IdEmpresas = 22 THEN 'Fomenta' 
					WHEN IdEmpresas = 24 THEN 'Bellpi SAS' 
					ELSE '' END NombreEmpresa

		  FROM [PSCService_DB].[dbo].spiga_ImpuestosImportes	
		  WHERE IdImpuestoTipos = 6
		  and IdFacturaTipos = 'R'
		  --and serie like '%V%'
		  -- AND NumFactura LIKE '%1433610%'
		  -- AND IdTerceros = '19345'
		  GROUP BY Ano_Periodo,		Mes_Periodo,	IdEmpresas,		IdTerceros,		NifCif, NombreTercero,	Apellido1,		Apellido2,		Serie,			NumFactura
)a 
--where serie like '%BPJP%'
--and NumFactura LIKE '%117823%'
--AND IdTerceros = '19281'
GROUP BY Ano_Periodo,Mes_Periodo,IdEmpresas,IdTerceros,NifCif,NombreTercero,Serie,NumFactura,NombreEmpresa

```
