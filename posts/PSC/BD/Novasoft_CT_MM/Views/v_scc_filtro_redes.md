# View: v_scc_filtro_redes

## Usa los objetos:
- [[SCC_RedesSociales]]

```sql

 /* =============================================
    Author:		 <OLIVIA ROMERO>
    Description: <Vista para filtrar el grid del Maestro de redes sociales >
    Modificado:  <21 Jul 2020>
    =============================================
*/

CREATE VIEW [dbo].[v_scc_filtro_redes]
AS

SELECT NroFormato,CONVERT(VARCHAR(10),FechaYHora,103) AS Fecha,CONVERT(VARCHAR(12),FechaYHora,114) AS Hora,NicknameRedSocial 
FROM SCC_RedesSociales 


```
