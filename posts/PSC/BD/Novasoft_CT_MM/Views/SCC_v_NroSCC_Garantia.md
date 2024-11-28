# View: SCC_v_NroSCC_Garantia

## Usa los objetos:
- [[SCC_Cabeza]]

```sql

/*
*FECHA:			12/01/2017
*AUTOR:			DAVID GALINDO
Description:	<Consulta SNR-SPR para garantias>
*/
CREATE VIEW [dbo].[SCC_v_NroSCC_Garantia]
AS
SELECT	C.Nro_SCC
		--,A.Nro_SCC as SRS 
FROM	SCC_Cabeza C 
		--CROSS JOIN SCC_v_Asigna_Solicitud A
WHERE	C.Tipo_SCC in(2,3) and C.Ind_tramite in (5,6)
		--AND C.FechaDeEntrega >= DATEADD(MM,-3,A.Fecha_Recibido)




```
