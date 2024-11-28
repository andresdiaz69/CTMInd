# View: vw_GAC_Facturas_Emitidas

## Usa los objetos:
- [[Empresas]]
- [[Spiga_InformeFacturas]]
- [[vw_UnidadDeNegocio]]

```sql

CREATE view [dbo].[vw_GAC_Facturas_Emitidas] as 

SELECT IdEmpresas,  NombreEmpresa,     Ano_Periodo,    Mes_Periodo,
       CodUnidadNegocio, NombreUnidadNegocio,   NumFact=count(DISTINCT a.SerieFactura+a.NumFactura+a.AñoFactura)
FROM(
		SELECT DISTINCT a.IdEmpresas,   c.NombreEmpresa,  a.Ano_Periodo, a.Mes_Periodo, 
		       a.SerieFactura,          a.NumFactura,     a.AñoFactura,a.NombreCentro,
		       CodUnidadNegocio= CASE WHEN a.NombreCentro LIKE 'CO%' THEN 5 
			                          WHEN a.NombreCentro like '%MIT-Bta Aduanas Repuestos%' or b.NombreCentro like 'MIT-Bta.San Facón'then 21
									  --WHEN a.NombreCentro like '%BYD-Bta-Mayorista%' then 246
									  when b.Sigla = 'MAY BYD' then 246
									  when b.Sigla = 'MAY MIT' then 21
									  when a.nombreCentro like '%JD%'and a.nombreCentro like '%tagui%' then 411
	                                  when a.nombreCentro like '%JD%'and a.nombreCentro like '%Rental%' then 411
	                                  when a.nombreCentro like '%JD%'and a.nombreCentro like '%Ruta 40%' then 520
	                                  when a.nombreCentro like '%JD%'and a.nombreCentro like '%quilla%' then 411
	                                  when a.nombreCentro like '%JD%'and a.nombreCentro like '%B/manga%'then 411
	                                  when (a.nombreCentro like '%JD%' or b.CodUnidadNegocio is null)  then 410
                                     -- when b.sigla like 'JD%' then 410
			                          ELSE b.CodUnidadNegocio END,
		       NombreUnidadNegocio = CASE WHEN a.NombreCentro LIKE 'CO%' THEN 'Colisión' 
			                              WHEN a.NombreCentro like '%MIT-Bta Aduanas Repuestos%'or b.NombreCentro like 'MIT-Bta.San Facón' then 'Mitsubishi Mayorista' 
										 -- WHEN a.NombreCentro like '%BYD-Bta-Mayorista%' then 'BYD Mayorista'
										  when b.Sigla = 'MAY BYD' then 'BYD Mayorista'
									      when b.Sigla = 'MAY MIT' then 'Mitsubishi Mayorista' 
										  when a.nombreCentro like '%JD%'and a.nombreCentro like '%tagui%' then 'JD Construccion'
	                                      when a.nombreCentro like '%JD%'and a.nombreCentro like '%Rental%' then 'JD Construccion'
	                                      when a.nombreCentro like '%JD%'and a.nombreCentro like '%Ruta 40%' then 'Wirtgen'
	                                      when a.nombreCentro like '%JD%'and a.nombreCentro like '%quilla%' then 'JD Construccion'
	                                      when a.nombreCentro like '%JD%'and a.nombreCentro like '%B/manga%'then 'JD Construccion'
	                                      when (a.nombreCentro like '%JD%' or b.CodUnidadNegocio is null)  then 'JD Agricola'
										  ELSE b.NombreUnidadNegocio END 
		,Sigla=CASE WHEN a.NombreCentro LIKE 'CO%' THEN 'CO'
		            when a.nombreCentro like '%JD%'and a.nombreCentro like '%tagui%' then 'JD.CONS'
	                when a.nombreCentro like '%JD%'and a.nombreCentro like '%Rental%' then 'JD.CONS'
	                when a.nombreCentro like '%JD%'and a.nombreCentro like '%Ruta 40%' then 'WIR'
	                when a.nombreCentro like '%JD%'and a.nombreCentro like '%quilla%' then 'JD.CONS'
	                when a.nombreCentro like '%JD%'and a.nombreCentro like '%B/manga%'then 'JD.CONS'
	                when (a.nombreCentro like '%JD%' or b.CodUnidadNegocio is null)  then 'JD.AGR'
					else b.Sigla END
		FROM [PSCService_DB].dbo.Spiga_InformeFacturas a
		LEFT JOIN vw_UnidadDeNegocio b ON a.IdCentros=b.CodCentro and a.IdEmpresas=b.CodEmpresa
		LEFT JOIN Empresas c ON c.CodigoEmpresa=a.IdEmpresas
		WHERE a.IdCentros <> 137 
		and IdEmpresas  not in (22,27)
		--and A.Ano_Periodo=2023 and  A.Mes_Periodo in(10,11,12) 
		--ANd seriefactura = 'A044'
        --and numfactura = '100150'
 )A
--WHERE A.Ano_Periodo=2023 and  A.Mes_Periodo in(10,11,12) 
--ANd seriefactura = 'A044'
--and numfactura = '100150'
GROUP BY  IdEmpresas , Ano_Periodo, Mes_Periodo,  CodUnidadNegocio, NombreUnidadNegocio,NombreEmpresa

```
