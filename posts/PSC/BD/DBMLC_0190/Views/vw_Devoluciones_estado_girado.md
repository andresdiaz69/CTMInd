# View: vw_Devoluciones_estado_girado

## Usa los objetos:
- [[Devoluciones_FormasPago]]
- [[Devoluciones_NatJuridica]]
- [[Devoluciones_preGiro]]
- [[Devoluciones_Solicitud]]
- [[Empresas]]
- [[spiga_Terceros]]
- [[vw_Devoluciones_EmpleadosActivosRetirados]]

```sql





CREATE VIEW [dbo].[vw_Devoluciones_estado_girado] AS
SELECT DISTINCT 
    s.IdSolicitud,
	CONCAT(d.Nombre, ' ', d.Apellido1, ' ', d.Apellido2) AS NombreCliente,   
	s.IdCliente,
	s.CorreoElectronico AS CorreoCliente,

	CASE
            WHEN d.FkNaturalezaJuridicaTipos = 'GB' THEN 'Gubernamental'
            WHEN d.FkNaturalezaJuridicaTipos = 'SJ' THEN 'Persona Jurídica'
            WHEN d.FkNaturalezaJuridicaTipos = 'SN' THEN 'Persona Natural'
            ELSE p.descNaturalezaJuridica
    END
    AS NAturalezaJuridicaCliente,

	CASE
        WHEN s.AplicaBeneficiario = 1 THEN s.NombresBeneficiario
        ELSE ''
    END 
	AS NombresBeneficiario,

	CASE
        WHEN s.AplicaBeneficiario = 1 THEN s.CedulaBeneficiario
        ELSE ''
    END 
	AS CedulaBeneficiario,

	fp.DescFormaPago,
	s.EntidadFinancieraDestino,
	s.NumeroCuentaDestino,
	s.TipoCuenta,
	s.ValorDevolucion,
	s.IdEmpresa,	   
	CONCAT( empl.Nombres,' ', empl.Apellido1, ' ', empl.Apellido2) AS NombreSolicitante,   
	empl.Email AS CorreoSolicitante,
    s.Estado,
    s.IdEmpleado AS IdSolicitante,
	s.FechaSolicitud,
	s.FechaModificacion AS FechaGirado,
	em.NombreEmpresa
   
    

FROM dbo.Devoluciones_Solicitud s

LEFT JOIN Devoluciones_NatJuridica p ON p.idNaturalezaJuridica = s.idNaturalezaJuridica 
LEFT JOIN Devoluciones_FormasPago fp ON fp.idFormaPago = s.IDFormaPago
LEFT JOIN vw_Devoluciones_EmpleadosActivosRetirados empl ON empl.CodigoEmpleado = s.IdEmpleado
left join  [PSCService_DB].dbo.spiga_Terceros d ON d.NifCif = s.IdCliente
LEFT JOIN Devoluciones_preGiro g ON g.idSolicitud = s.IdSolicitud
Inner Join Empresas Em ON em.CodigoEmpresa = s.IdEmpresa	

WHERE s.Estado = 'GIRADO' AND  ( ( MONTH(s.FechaSolicitud) > 7 AND YEAR(s.FechaSolicitud) >= 2023 ) OR ( MONTH(s.FechaSolicitud) >= 1 AND YEAR(s.FechaSolicitud) >= 2024) ) AND g.idPagos IS NULL 

```
